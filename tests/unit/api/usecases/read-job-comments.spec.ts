import { vitest, describe, it, expect } from 'vitest'
import { JobCommentEntity } from '@/server/domain/entities'
import { GetJobComments } from '@/server/usecases'
import { JobRepository } from '@/server/domain/interfaces'

describe('GetJobComments', () => {
  it('Should return job comments', async () => {
    // Given
    const jobComments: JobCommentEntity[] = [
      {
        id: '1',
        created_at: new Date().toString(),
        body: 'test',
        user: {
          avatar_url: 'https://test.com',
          login_id: 'https://test.com'
        }
      }
    ]

    const mockJobRepository: JobRepository = {
      ...{} as JobRepository,
      getComments: vitest.fn().mockResolvedValue(jobComments)
    }

    // When
    const result = await GetJobComments(mockJobRepository)('1')

    // Then
    expect(result).toEqual(jobComments)
  })
})
