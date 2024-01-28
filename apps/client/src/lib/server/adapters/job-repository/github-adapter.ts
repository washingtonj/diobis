import type { JobRepository } from '$lib/server/interfaces';
import type { JobEntity } from '$lib/server/entities';

import { repositories } from './github-settings';
import { fromGitHubResponse } from './github-transform';
import type { GitHubResponse } from './github-responses';

export class GitHubJobRepositoryAdapter implements JobRepository {
  async getJobs(): Promise<JobEntity[]> {
    const requests: Promise<JobEntity>[] = repositories.map(({ name, repo }) =>
      fetch(`https://api.github.com/repos/${name}/${repo}/issues`)
        .then((res) => res.json())
        .then((data) => data.map((item: GitHubResponse) => fromGitHubResponse(item, name)))
    );

    return (await Promise.all(requests))
      .flat()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
