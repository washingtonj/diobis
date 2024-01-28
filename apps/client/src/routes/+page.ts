import type { PageLoad } from './$types';
import { GitHubJobRepositoryAdapter } from '$lib/adapters';

async function getData() {
  const adapter = new GitHubJobRepositoryAdapter();
  const data = await adapter.getJobs();

  return data.map((job) => ({
    ...job,
    description: job.description.slice(0, 100)
  }));
}

export const load: PageLoad = async () => {
  return {
    payload: getData
  };
};
