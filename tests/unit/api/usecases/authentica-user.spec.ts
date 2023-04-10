import { describe, it, expect, vitest } from 'vitest'
import { AuthenticateUser } from '@/server/usecases'
import { GitHubService } from '@/server/domain/interfaces'

describe('AuthenticateUser', () => {
  it('Should authenticate user', async () => {
    // given
    const expectedToken = {
      token: 'token',
      type: 'type'
    }

    const expectedUser = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login_id: 'login_id'
    }

    const mockGitHubService: GitHubService = {
      getAllJobs: vitest.fn(),
      getAuthToken: vitest.fn().mockResolvedValue(expectedToken),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn(),
      getUserByToken: vitest.fn().mockResolvedValue(expectedUser)
    }

    // when
    const { auth, user } = await AuthenticateUser(mockGitHubService)('GitHubOAuthCode')

    // then
    expect(auth).toEqual(expectedToken)
    expect(user).toEqual(expectedUser)
  })
})
