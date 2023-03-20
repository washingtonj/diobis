import { GitHubService } from '@/core/domain/interfaces'

export function getUser (GitHubService: GitHubService) {
  return async function (token: string) {
    return await GitHubService.getUserByToken(token)
  }
}
