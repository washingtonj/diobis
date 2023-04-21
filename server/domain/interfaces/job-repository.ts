import { JobEntity, JobCommentEntity } from '@/server/domain/entities'

export interface JobRepository {
  getAll(): Promise<JobEntity[]>
  getUnique(jobId: string): Promise<JobEntity>
  getComments(jobId: string): Promise<JobCommentEntity[]>
  putComment(jobId: string, comment: string): Promise<JobCommentEntity>
}
