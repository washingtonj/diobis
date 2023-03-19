import { describe, it, expect, vitest } from 'vitest'
import { AuthenticateUser } from '@/core/domain/usecases'
import { GitHubService } from '@/core/domain/interfaces'

describe('AuthenticateUser', () => {
  it('Should authenticate user', async () => {
    // given
    const expectedToken = 'Bearer token'

    const mockGitHubService: GitHubService = {
      getAllJobs: vitest.fn(),
      getAuthToken: vitest.fn().mockResolvedValue(expectedToken),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn()
    }

    // when
    const authenticateUser = await AuthenticateUser(mockGitHubService)('GitHubOAuthCode')

    // then
    expect(authenticateUser).toBe(expectedToken)
  })
})
