import type { JobEntity } from '$lib/entities';

export interface JobRepository {
  getJobs(): Promise<JobEntity[]>;
}
