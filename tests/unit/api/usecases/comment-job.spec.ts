import { describe, it, expect, vi } from 'vitest'
import { commentJob } from '@/server/usecases'
import { CacheService, GitHubService } from '@/server/domain/interfaces'
import { JobCommentEntity } from '@/server/domain/entities'

describe('CommentJob - UseCase', () => {
  it('Should create a comment without cached comments', async () => {
    // Given
    const data = {
      group: 'group',
      repo: 'repo',
      id: 'id',
      comment: 'comment'
    }

    const responseMock = {
      body: data.comment,
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      }
    } as JobCommentEntity

    const GitHubServiceMock: GitHubService = {
      ...{} as GitHubService,
      createComment: vi.fn().mockResolvedValue(responseMock)
    }

    const CacheServiceMock: CacheService = {
      ...{} as CacheService,
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(null)
    }

    // When
    const result = await commentJob(GitHubServiceMock, CacheServiceMock)(data.group, data.repo, data.id, data.comment)

    // Then
    expect(GitHubServiceMock.createComment).toHaveBeenCalledWith(data.group, data.repo, data.id, data.comment)
    expect(result).toBe(responseMock)
  })

  it('Should create a comment with cached comments', async () => {
    // Given
    const data = {
      group: 'group',
      repo: 'repo',
      id: 'id',
      comment: 'comment'
    }

    const responseMock = {
      body: data.comment,
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      }
    } as JobCommentEntity

    const GitHubServiceMock: GitHubService = {
      ...{} as GitHubService,
      createComment: vi.fn().mockResolvedValue(responseMock)
    }

    const CacheServiceMock: CacheService = {
      ...{} as CacheService,
      get: vi.fn().mockResolvedValue([responseMock]),
      set: vi.fn().mockResolvedValue(null)
    }

    // When
    const result = await commentJob(GitHubServiceMock, CacheServiceMock)(data.group, data.repo, data.id, data.comment)

    // Then
    expect(GitHubServiceMock.createComment).toHaveBeenCalledWith(data.group, data.repo, data.id, data.comment)
    expect(result).toEqual([responseMock, responseMock])
  })
})
