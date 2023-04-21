import { describe, it, expect, vitest } from 'vitest'
import { GitHubAuth } from '@/server/infrastructure/adapters'
import { GitHubService } from '@/server/infrastructure/interfaces'

describe('GithubAuthAdapter', () => {
  it('should be able to authenticate a user', async () => {
    // Given
    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getAuthToken: vitest.fn().mockResolvedValue({}),
      getUserByToken: vitest.fn().mockResolvedValue({})
    }

    const AuthService = GitHubAuth({ GitHubService: mockGitHubService })

    // When
    const result = await AuthService.oAuthAuthentication('code')

    // Then
    expect(result).toEqual({})
  })

  it('should be able to get user data', async () => {
    // Given
    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getAuthToken: vitest.fn().mockResolvedValue({}),
      getUserByToken: vitest.fn().mockResolvedValue({})
    }

    const AuthService = GitHubAuth({ GitHubService: mockGitHubService })

    // When
    const result = await AuthService.getUserByToken('code')

    // Then
    expect(result).toEqual({})
  })
})
