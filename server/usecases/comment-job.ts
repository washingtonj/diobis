import { JobRepository } from '@/server/domain/interfaces'

export function CommentJob (JobRepository: JobRepository) {
  return async (jobId: string, comment: string) => await JobRepository.putComment(jobId, comment)
}
