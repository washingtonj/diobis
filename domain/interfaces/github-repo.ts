import { JobEntity } from '@/domain/entities'

export interface GitHubRepo {
  getAll: (group: string, repo: string) => Promise<JobEntity[]>
  getById: (group: string, repo: string, id: string) => Promise<JobEntity>
}