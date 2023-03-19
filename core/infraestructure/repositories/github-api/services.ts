import {
  GITHUB_BASE_URL,
  GITHUB_PARAMS,
  GITHUB_REPOS,
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET
} from './constants'

import { GitHubComment, GitHubIssue, GitHubOAuth } from './models'
import { Transform } from './transforms'

import { JobEntity } from '@/core/domain/entities'
import { GitHubService } from '@/core/domain/interfaces'
import { JobNotFoundError, InvalidGitHubOAuthCodeError } from '@/core/domain/errors'
import { Logger } from '@/utils'

export const GitHubAPI: GitHubService = {
  getAllJobs: async () => {
    const jobs: JobEntity[] = []

    for await (const repo of GITHUB_REPOS) {
      const issues = await $fetch<GitHubIssue[]>(`${GITHUB_BASE_URL}/${repo.group}/${repo.repo}/issues`, { params: GITHUB_PARAMS })

      Logger('GitHubAPI', `Found ${issues.length} jobs in ${repo.group}/${repo.repo}`)

      const repoJobs = issues.map(issue => Transform.toJobEntity(issue, repo))
      jobs.push(...repoJobs)
    }

    return jobs
  },

  getJobById: async (group, repo, id) => {
    const raw = await $fetch<GitHubIssue>(`${GITHUB_BASE_URL}/${group}/${repo}/issues/${id}`, { params: GITHUB_PARAMS })

    Logger('GitHubAPI', `Found job in ${group}/${repo}/${id}`)

    if (!raw) { throw new JobNotFoundError({ group, id, repo }) }

    return Transform.toJobEntity(raw, { group, repo })
  },

  getJobComments: async (group, repo, id) => {
    const raw = await $fetch<GitHubComment[]>(`${GITHUB_BASE_URL}/${group}/${repo}/issues/${id}/comments`, { params: GITHUB_PARAMS })

    Logger('GitHubAPI', `Found ${raw.length} comments in ${group}/${repo}/${id}`)

    return raw.map((item: any) => Transform.toCommentEntity(item))
  },

  getAuthToken: async (authCode) => {
    const bearerToken = await $fetch<GitHubOAuth>('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        client_id: GITHUB_OAUTH_CLIENT_ID,
        client_secret: GITHUB_OAUTH_CLIENT_SECRET,
        code: authCode
      }
    })

    Logger('GitHubAPI', `Got auth token for ${authCode}`)

    if (!bearerToken.access_token) {
      throw new InvalidGitHubOAuthCodeError({ code: authCode, state: 'unknown' })
    }

    return `Bearer ${bearerToken.access_token}`
  }
}
