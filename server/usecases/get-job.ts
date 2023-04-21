import { JobRepository } from '@/server/domain/interfaces'

export function GetJob (JobRepository: JobRepository) {
  return async (id: string) => await JobRepository.getUnique(id)
}
