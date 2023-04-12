import { JobEntity, JobCommentEntity, UserEntity } from '@/server/domain/entities'

export interface GitHubService {
  getAllJobs: () => Promise<JobEntity[]>
  getJobById: (group: string, repo: string, id: string) => Promise<JobEntity>
  getJobComments: (group: string, repo: string, id: string) => Promise<JobCommentEntity[]>
  getAuthToken: (authCode: string) => Promise<{ token: string, type: string }>
  getUserByToken: (token: string) => Promise<UserEntity>
  createComment: (group: string, repo: string, id: string, comment: string) => Promise<JobCommentEntity>
}
