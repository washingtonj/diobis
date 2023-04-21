import { UserEntity } from '@/server/domain/entities'

export interface AuthService {
  oAuthAuthentication(authCode: string): Promise<{ token: string, type: string }>
  getUserByToken(token: string): Promise<UserEntity>
}
