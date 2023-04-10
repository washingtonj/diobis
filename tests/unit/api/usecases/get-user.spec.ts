import { describe, it, expect, vi } from 'vitest'
import { getUser } from '@/server/usecases/get-user'
import { UserEntity } from '@/server/domain/entities'
import { GitHubService } from '@/server/domain/interfaces'

describe('getUser', () => {
  it('Should return the user informations', async () => {
    // given
    const expectedUser: UserEntity = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login_id: 'login_id'
    }

    const mockGitHubService = {
      ...{} as GitHubService,
      getUserByToken: vi.fn().mockResolvedValue(expectedUser)
    }

    // when
    const user = await getUser(mockGitHubService)('login_id')

    // then
    expect(user).toEqual(expectedUser)
  })
})
