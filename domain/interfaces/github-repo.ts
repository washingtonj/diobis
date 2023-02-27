import { JobEntity, CommentEntity } from '@/domain/entities'

export interface GitHubRepo {
  getAll: (group: string, repo: string) => Promise<JobEntity[]>
  getById: (group: string, repo: string, id: string) => Promise<JobEntity>
  getComments: (group: string, repo: string, id: string) => Promise<CommentEntity[]>
}
