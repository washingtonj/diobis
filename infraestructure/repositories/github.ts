import { JobEntity } from '@/domain/entities'
import { GitHubRepo } from '@/domain/interfaces'
import { JobNotFoundError } from '@/domain/errors'
import { Logger } from '@/utils'

const GITHUB_BASE_URL = 'https://api.github.com/repos'
const GITHUB_PARAMS = { per_page: 100 }

const Transform = {
  toJobEntity (data: any, group: string): JobEntity {
    return {
      group,
      id: data.node_id,
      number: data.number,
      title: data.title,
      avatarUrl: data.user.avatar_url,
      createdBy: data.user.login,
      createdAt: data.created_at,
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
  }
}

export const GitHubRepository: GitHubRepo = {
  getAll: async (group, repo) => {
    const storageKey = `gh/${group}/${repo}`
    const storageData = await useStorage().getItem<JobEntity[]>(storageKey)

    // revalidate cache after 1 hour
    const lastValidated = await useStorage().getItem<number>(`${storageKey}/lastValidated`)
    const isInvalid = new Date().getTime() - (lastValidated || 0) > 3600000

    if (storageData && isInvalid) {
      Logger('GitHubRepository', `Revalidating cache for ${storageKey}`)
      await useStorage().setItem(`${storageKey}/lastValidated`, new Date().getTime())
      await useStorage().removeItem(storageKey)
    }

    if (storageData) {
      Logger('GitHubRepository', `Using cache for ${storageKey}`)
      return storageData
    }

    const rawJobs = await $fetch<any[]>(`${GITHUB_BASE_URL}/${group}/${repo}/issues`, { params: GITHUB_PARAMS })
    const transformedJobs = rawJobs.map((item: any) => Transform.toJobEntity(item, group))

    await useStorage().setItem(storageKey, transformedJobs)

    return transformedJobs
  },

  getById: async (group, repo, id) => {
    const jobsFromGroup = await GitHubRepository.getAll(group, repo)
    const job = jobsFromGroup.find(item => item.id === id)

    if (job) { return job }

    return $fetch<any>(`${GITHUB_BASE_URL}/${group}/${repo}/issues/${id}`)
      .then(data => Transform.toJobEntity(data, group))
      .catch(() => { throw new JobNotFoundError({ group, repo, id }) })
  }
}
