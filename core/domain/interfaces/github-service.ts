import { JobEntity, CommentEntity, UserEntity } from '@/core/domain/entities'

export interface GitHubService {
  getAllJobs: () => Promise<JobEntity[]>
  getJobById: (group: string, repo: string, id: string) => Promise<JobEntity>
  getJobComments: (group: string, repo: string, id: string) => Promise<CommentEntity[]>
  getAuthToken: (authCode: string) => Promise<{ token: string, type: string }>
  getUserByToken: (token: string) => Promise<UserEntity>
  createComment: (group: string, repo: string, id: string, comment: string) => Promise<CommentEntity>
}
