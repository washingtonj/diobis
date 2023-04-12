import { describe, it, expect, vi } from 'vitest'
import { commentJob } from '@/server/usecases'
import { JobRepository } from '@/server/domain/interfaces'
import { JobCommentEntity } from '@/server/domain/entities'

describe('CommentJob - UseCase', () => {
  it('Should comment a job', async () => {
    // Given
    const data: JobCommentEntity = {
      id: '1',
      body: 'comment',
      created_at: new Date().toISOString(),
      user: {
        avatar_url: 'avatar_url',
        login_id: 'login_id'
      }
    }

    const Repository: JobRepository = {
      ...{} as JobRepository,
      putComment: vi.fn().mockResolvedValue(data)
    }

    // When
    const result = await commentJob(Repository)('some_id', 'comment')

    // Then
    expect(result).toEqual(data)
  })
})
