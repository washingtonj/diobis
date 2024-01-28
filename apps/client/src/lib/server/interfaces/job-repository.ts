import type { JobEntity } from '$lib/server/entities';

export interface JobRepository {
  getJobs(): Promise<JobEntity[]>;
}
