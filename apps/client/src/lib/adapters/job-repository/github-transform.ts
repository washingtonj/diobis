import type { JobEntity } from '$lib/entities';
import type { GitHubResponse } from './github-responses';

export function fromGitHubResponse(response: GitHubResponse, repository: string): JobEntity {
  return {
    title: response.title,
    description: response.body,
    source: `GH/${repository}/${response.user.login}`,
    tags: response.labels.map((label) => label.name),
    quantityOfComments: response.comments,
    quantityOfInteractions:
      response.reactions.confused +
      response.reactions.eyes +
      response.reactions.heart +
      response.reactions.rocket,
    createdAt: response.created_at,
    userAvatar: response.user.avatar_url,
    sourceUrl: response.html_url
  };
}
