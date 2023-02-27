import { JobEntity, CommentEntity } from '@/domain/entities'

export interface GitHubService {
  getAllJobs: () => Promise<JobEntity[]>
  getJobById: (group: string, repo: string, id: string) => Promise<JobEntity>
  getJobComments: (group: string, repo: string, id: string) => Promise<CommentEntity[]>
}
