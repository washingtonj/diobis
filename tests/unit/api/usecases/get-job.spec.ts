import { describe, it, expect, vitest } from 'vitest'
import { GetJob } from '@/server/usecases'
import { JobRepository } from '@/server/domain/interfaces'
import { JobEntity } from '@/server/domain/entities'

describe('GetJob', () => {
  it('Should read a job from Cache Service', async () => {
    // given
    const expectedJob: JobEntity = {
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      title: 'Job Title',
      markdown: 'Job Description',
      tags: ['tag1', 'tag2'],
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      interactions: {
        comments: 1
      },
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      }
    }

    const mockJobRepository: JobRepository = {
      ...{} as JobRepository,
      getUnique: vitest.fn().mockResolvedValue(expectedJob)
    }

    // when
    const job = await GetJob(mockJobRepository)(expectedJob.id)

    // then
    expect(job).toEqual(expectedJob)
  })

  it('Shold throw an error when job is not found', async () => {
    // given
    const expectedJob: JobEntity = {
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      title: 'Job Title',
      markdown: 'Job Description',
      tags: ['tag1', 'tag2'],
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      interactions: {
        comments: 1
      },
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      }
    }

    const mockJobRepository: JobRepository = {
      ...{} as JobRepository,
      getUnique: vitest.fn().mockRejectedValue(expectedJob)
    }

    // when
    const job = GetJob(mockJobRepository)(expectedJob.id)

    // then
    await expect(job).rejects.toThrow()
  })
})
