import { CommentEntity, JobEntity } from '@/domain/entities'
import { GitHubService } from '@/domain/interfaces'
import { JobNotFoundError } from '@/domain/errors'
import { Logger } from '@/utils'

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
  }
}
