import { CommentEntity, JobEntity } from '@/core/domain/entities'
import { GitHubService } from '@/core/domain/interfaces'
import { JobNotFoundError, InvalidGitHubOAuthCodeError } from '@/core/domain/errors'
import { Logger } from '@/utils'

interface GitHubOAuthResponse {
  access_token: string
  scope: string
  token_type: string
}

const GITHUB_BASE_URL = 'https://api.github.com/repos'
const GITHUB_PARAMS = { per_page: 100 }
const GITHUB_REPOS = [
  { group: 'frontendbr', repo: 'vagas' },
  { group: 'backend-br', repo: 'vagas' }
]

const Transform = {
  toJobEntity (data: any, repo: { group: string, repo: string }): JobEntity {
    return {
      id: String(data.number),
      title: data.title,
      created_at: data.created_at,
      user: {
        avatar_url: data.user.avatar_url,
        login_id: data.user.login
      },
      repository: {
        group: repo.group,
        repo: repo.repo
      },
      tags: data.labels.map((item: any) => item.name),
      markdown: data.body,
      reactions: {
        confused: data.reactions.confused,
        eyes: data.reactions.eyes,
        heart: data.reactions.heart,
        rocket: data.reactions.rocket
      },
      interactions: {
        comments: data.comments
      }
    }
  },
  toCommentEntity (data: any): CommentEntity {
    return {
      id: data.number,
      body: data.body,
      created_at: data.created_at,
      user: {
        avatar_url: data.user.avatar_url,
        login_id: data.user.login
      }
    }
  }
}

export const GitHubAPI: GitHubService = {
  getAllJobs: async () => {
    const jobs: JobEntity[] = []

    for await (const repo of GITHUB_REPOS) {
      const issues = await $fetch<any[]>(`${GITHUB_BASE_URL}/${repo.group}/${repo.repo}/issues`, { params: GITHUB_PARAMS })
      Logger('GitHubAPI', `Found ${issues.length} jobs in ${repo.group}/${repo.repo}`)

      const repoJobs = issues.map(issue => Transform.toJobEntity(issue, repo))
      jobs.push(...repoJobs)
    }

    return jobs
  },

  getJobById: async (group, repo, id) => {
    const raw = await $fetch<any[]>(`${GITHUB_BASE_URL}/${group}/${repo}/issues/${id}`, { params: GITHUB_PARAMS })
    Logger('GitHubAPI', `Found job in ${group}/${repo}/${id}`)
    if (!raw) { throw new JobNotFoundError({ group, id, repo }) }
    return Transform.toJobEntity(raw, { group, repo })
  },

  getJobComments: async (group, repo, id) => {
    const raw = await $fetch<any[]>(`${GITHUB_BASE_URL}/${group}/${repo}/issues/${id}/comments`, { params: GITHUB_PARAMS })
    Logger('GitHubAPI', `Found ${raw.length} comments in ${group}/${repo}/${id}`)
    return raw.map((item: any) => Transform.toCommentEntity(item))
  },

  getAuthToken: async (authCode) => {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET

    const bearerToken = await $fetch<GitHubOAuthResponse>('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        client_id: clientId,
        client_secret: clientSecret,
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
