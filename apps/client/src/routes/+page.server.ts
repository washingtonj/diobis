import type { PageServerLoad } from './$types';
import { GitHubJobRepositoryAdapter } from '$lib/server/adapters';

async function getdata() {
  const adapter = new GitHubJobRepositoryAdapter();
  const response = await adapter.getJobs();

  return response.map((job) => ({
    ...job,
    description: job.description.slice(0, 100)
  }));
}

export const load: PageServerLoad = async () => {
  return {
    jobs: getdata()
  };
};
