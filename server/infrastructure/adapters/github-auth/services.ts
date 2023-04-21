import { AuthService } from '@/server/domain/interfaces'
import { GitHubService } from '@/server/infrastructure/interfaces'

type GitHubAuthDI = {
  GitHubService: GitHubService
}

export function GitHubAuth (DI: GitHubAuthDI): AuthService {
  return {
    async getUserByToken (token) {
      return await DI.GitHubService.getUserByToken(token)
    },

    async oAuthAuthentication (authCode) {
      return await DI.GitHubService.getAuthToken(authCode)
    }
  }
}
