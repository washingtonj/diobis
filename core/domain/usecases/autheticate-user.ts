import { GitHubService } from '@/core/domain/interfaces'

export function AuthenticateUser (GitHubService: GitHubService) {
  return async function (authCode: string) {
    return await GitHubService.getAuthToken(authCode)
  }
}
