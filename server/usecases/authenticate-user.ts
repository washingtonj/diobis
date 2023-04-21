import { AuthService } from '@/server/domain/interfaces'

export function AuthenticateUser (AuthService: AuthService) {
  return async function (authCode: string) {
    const oAuth = await AuthService.oAuthAuthentication(authCode)
    const user = await AuthService.getUserByToken(oAuth.token)

    return { user, auth: oAuth }
  }
}
