import { describe, expect, it } from 'vitest'
import { GitHubAPIFactory } from '@/server/infrastructure/services/github-api/factory'

describe('GitHubAPI - Factory', () => {
  it('Should return a GitHub instance if is dev', () => {
    // Given
    process.env.NODE_ENV = 'development'

    // When
    const githubAPI = GitHubAPIFactory({ authorization: 'token' })

    // Then
    expect(githubAPI).toBeDefined()
  })

  it('Should return a GitHub instance if is prod', () => {
    // Given
    process.env.NODE_ENV = 'production'

    // When
    const githubAPI = GitHubAPIFactory({ authorization: 'token' })

    // Then
    expect(githubAPI).toBeDefined()
  })
})
