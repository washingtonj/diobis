import type { PageServerLoad } from './$types';
import { GitHubJobRepositoryAdapter } from '$lib/server/adapters';

async function getdata() {
  const adapter = new GitHubJobRepositoryAdapter();
  return adapter.getJobs();
}

export const load: PageServerLoad = async () => {
  return {
    jobs: getdata()
  };
};
