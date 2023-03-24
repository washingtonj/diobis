import { vitest, describe, it, expect } from 'vitest'
import { CommentEntity } from '@/core/domain/entities'
import { ReadJobComments } from '@/core/domain/usecases'
import { GitHubService, CacheService } from '@/core/domain/interfaces'

describe('ReadJobComments', () => {
  it('Should return a list of comments from GitHub Service', async () => {
    // given
    const expectedComments: CommentEntity[] = [
      {
        body: 'Comment Body',
        created_at: '2021-01-01T00:00:00Z',
        id: 'id',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          login_id: 'login_id'
        }
      }
    ]

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue(expectedComments)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const comments = await ReadJobComments(mockGitHubService, mockCacheService)('group', 'repo', 'id')

    // then
    expect(comments).toEqual(expectedComments)
  })

  it('Should return a list of comments from Cache Service', async () => {
    // given
    const expectedComments: CommentEntity[] = [
      {
        body: 'Comment Body',
        created_at: '2021-01-01T00:00:00Z',
        id: 'id',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          login_id: 'login_id'
        }
      }
    ]

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn(),
      getAuthToken: vitest.fn(),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn()
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      get: vitest.fn().mockResolvedValue(expectedComments),
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date())
    }

    // when
    const comments = await ReadJobComments(mockGitHubService, mockCacheService)('group', 'repo', 'id')

    // then
    expect(comments).toEqual(expectedComments)
  })

  it('Should update cache service if cache is invalid', async () => {
    // given
    const expectedComments: CommentEntity[] = [
      {
        body: 'Comment Body',
        created_at: '2021-01-01T00:00:00Z',
        id: 'id',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          login_id: 'login_id'
        }
      }
    ]

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue(expectedComments)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      get: vitest.fn().mockResolvedValue(expectedComments),
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date('2020-01-01T00:00:00Z'))
    }

    // when
    const comments = await ReadJobComments(mockGitHubService, mockCacheService)('group', 'repo', 'id')

    // then
    expect(comments).toEqual(expectedComments)
  })

  it('Should update the cache service if cache is outdated', async () => {
    // given
    const expectedComments: CommentEntity[] = [
      {
        body: 'Comment Body',
        created_at: '2021-01-01T00:00:00Z',
        id: 'id',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          login_id: 'login_id'
        }
      }
    ]

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue(expectedComments)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      get: vitest.fn().mockResolvedValue(expectedComments),
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date('2020-01-01T00:00:00Z'))
    }

    // when
    const comments = await ReadJobComments(mockGitHubService, mockCacheService)('group', 'repo', 'id')

    // then
    expect(comments).toEqual(expectedComments)
  })
})
