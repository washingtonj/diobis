import { JobEntity } from '@/server/domain/entities'

export interface JobRepository {
  getAll(): Promise<JobEntity[]>
  getUnique(id: string): Promise<JobEntity>
}
