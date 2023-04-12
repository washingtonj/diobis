import { JobRepository } from '@/server/domain/interfaces'

export function commentJob (JobRepository: JobRepository) {
  return async (jobId: string, comment: string) => await JobRepository.putComment(jobId, comment)
}
