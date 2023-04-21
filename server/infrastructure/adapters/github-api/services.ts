import {
  GITHUB_BASE_URL,
  GITHUB_PARAMS,
  GITHUB_REPOS,
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET
} from './constants'

import { GitHubComment, GitHubIssue, GitHubOAuth, GitHubUser } from './models'
import { Transform } from './transforms'

import { JobEntity } from '@/server/domain/entities'
import { GitHubService } from '@/server/infrastructure/interfaces'
import { JobNotFoundError, InvalidGitHubOAuthCodeError, InvalidGitHubToken } from '@/server/domain/errors'
import { Logger } from '@/utils'

type GitHubAPIOpts = {
  authorization?: string
  repositories?: typeof GITHUB_REPOS
}

export const GitHubAPI = (opts?: GitHubAPIOpts): GitHubService => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: opts?.authorization || ''
  }

  const repositories = opts?.repositories || GITHUB_REPOS

  Logger('GitHubAPI', `[${opts?.authorization ? 'Authenticated' : 'Unauthenticated'}] GitHubAPI instance created!`)

  return {
    authenticated: !!opts?.authorization,

    getAllJobs: async () => {
      const jobs: JobEntity[] = []

      for await (const repo of repositories) {
        const issues = await $fetch<GitHubIssue[]>(`${GITHUB_BASE_URL}/repos/${repo.group}/${repo.repo}/issues`, { headers, params: GITHUB_PARAMS })

        Logger('GitHubAPI', `Found ${issues.length} jobs in ${repo.group}/${repo.repo}`)

        const repoJobs = issues.map(issue => Transform.toJobEntity(issue, repo))
        jobs.push(...repoJobs)
      }

      return jobs
    },

    getJobById: async (jobId) => {
      const { group, id, repo } = Transform.fromCriptedId(jobId)

      const raw = await $fetch<GitHubIssue>(`${GITHUB_BASE_URL}/repos/${group}/${repo}/issues/${id}`, { headers, params: GITHUB_PARAMS })

      Logger('GitHubAPI', `Found job in ${group}/${repo}/${id}`)

      if (!raw) { throw new JobNotFoundError({ group, id, repo }) }

      return Transform.toJobEntity(raw, { group, repo })
    },

    getJobComments: async (jobId) => {
      const { group, id, repo } = Transform.fromCriptedId(jobId)

      const raw = await $fetch<GitHubComment[]>(`${GITHUB_BASE_URL}/repos/${group}/${repo}/issues/${id}/comments`, { headers, params: GITHUB_PARAMS })

      Logger('GitHubAPI', `Found ${raw.length} comments in ${group}/${repo}/${id}`)

      return raw.map((item: any) => Transform.toJobCommentEntity(item))
    },

    getAuthToken: async (authCode) => {
      const bearerToken = await $fetch<GitHubOAuth>('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers,
        body: {
          client_id: GITHUB_OAUTH_CLIENT_ID,
          client_secret: GITHUB_OAUTH_CLIENT_SECRET,
          code: authCode
        }
      })

      if (!bearerToken.access_token) {
        throw new InvalidGitHubOAuthCodeError({ code: authCode, state: 'unknown' })
      }

      Logger('GitHubAPI', `Got auth token for ${authCode}`)

      return Promise.resolve({
        token: bearerToken.access_token,
        type: bearerToken.token_type
      })
    },

    getUserByToken: async (token) => {
      const user = await $fetch<GitHubUser>(`${GITHUB_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!user) {
        throw new InvalidGitHubToken({ code: token })
      }

      Logger('GitHubAPI', `Got user ${user.login} for token ${token}`)

      return Transform.toUserEntity(user)
    },

    async createComment (jobId, comment) {
      const { group, id, repo } = Transform.fromCriptedId(jobId)

      const data = await $fetch<GitHubComment>(`${GITHUB_BASE_URL}/repos/${group}/${repo}/issues/${id}/comments`, {
        method: 'POST',
        headers,
        body: {
          body: comment
        }
      })

      Logger('GitHubAPI', `Created comment ${comment} in ${group}/${repo}/${id}`)

      return Transform.toJobCommentEntity(data)
    }
  }
}
