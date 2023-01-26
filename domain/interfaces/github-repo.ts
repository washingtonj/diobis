import { JobEntity } from '@/domain/entities'

export interface GitHubRepo {
  getAll: (group: string, repo: string) => Promise<JobEntity[]>
}