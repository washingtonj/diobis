import { JobEntity, CommentEntity } from '@/core/domain/entities'

export interface GitHubService {
  getAllJobs: () => Promise<JobEntity[]>
  getJobById: (group: string, repo: string, id: string) => Promise<JobEntity>
  getJobComments: (group: string, repo: string, id: string) => Promise<CommentEntity[]>
  getAuthToken: (authCode: string) => Promise<string>
}
