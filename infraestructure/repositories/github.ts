import { JobEntity } from '@/domain/entities'
import { GitHubRepo } from "@/domain/interfaces";
import { Logger } from '@/utils'

const GITHUB_BASE_URL = 'https://api.github.com/repos'
const GITHUB_PARAMS = { per_page: 100 }

const Transform = {
  toJobEntity(data: any, group: string): JobEntity {
    return {
      id: data.node_id,
      number: data.number,
      title: data.title,
      avatarUrl: data.user.avatar_url,
      createdBy: data.user.login,
      createdAt: data.created_at,
      tags: data.labels.map((item: any) => item.name),
      markdown: data.body,
      group
    }
  }
}

export const GitHubRepository: GitHubRepo = {
  getAll: async (group: string, repo: string) => {
    const storageKey = `gh/${group}/${repo}`
    const storageData = await useStorage().getItem<JobEntity[]>(storageKey)

    if (storageData) {
      Logger('GitHubRepository', `Using cache for ${storageKey}`)
      return storageData
    }
    
    const rawJobs = await $fetch<any[]>(`${GITHUB_BASE_URL}/${group}/${repo}/issues`, { params: GITHUB_PARAMS })
    const transformedJobs = rawJobs.map((item: any) => Transform.toJobEntity(item, group))
    
    await useStorage().setItem(storageKey, transformedJobs)

    return transformedJobs
  }
}