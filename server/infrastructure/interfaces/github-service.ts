import { JobEntity, JobCommentEntity, UserEntity } from '@/server/domain/entities'

export interface GitHubService {
  authenticated: boolean
  getAllJobs: () => Promise<JobEntity[]>
  getJobById: (jobId: string) => Promise<JobEntity>
  getJobComments: (jobId: string) => Promise<JobCommentEntity[]>
  getAuthToken: (authCode: string) => Promise<{ token: string, type: string }>
  getUserByToken: (token: string) => Promise<UserEntity>
  createComment: (jobId: string, comment: string) => Promise<JobCommentEntity>
}
