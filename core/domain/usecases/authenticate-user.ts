import { GitHubService } from '@/core/domain/interfaces'

export function AuthenticateUser (GitHubService: GitHubService) {
  return async function (authCode: string) {
    const oAuth = await GitHubService.getAuthToken(authCode)
    const user = await GitHubService.getUserByToken(oAuth.token)

    return { user, auth: oAuth }
  }
}
