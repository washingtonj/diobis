import { JobEntity } from '@/core/domain/entities'

export interface JobRepository {
  getAll(): Promise<JobEntity[]>
}
