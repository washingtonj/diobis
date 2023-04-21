import { AuthService } from '@/server/domain/interfaces'

export function getUser (AuthService: AuthService) {
  return async function (token: string) {
    return await AuthService.getUserByToken(token)
  }
}
