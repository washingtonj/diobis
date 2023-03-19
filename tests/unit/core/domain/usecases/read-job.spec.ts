import { describe, it, expect, vitest } from 'vitest'
import { ReadJob } from '@/core/domain/usecases'
import { CacheService } from '@/core/domain/interfaces'
import { JobEntity } from '@/core/domain/entities'

describe('ReadJob', () => {
  it('Should read a job from Cache Service', async () => {
    // given
    const expectedJob: JobEntity = {
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      title: 'Job Title',
      markdown: 'Job Description',
      repository: {
        group: 'group',
        repo: 'repo'
      },
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

    const mockCacheService: CacheService = {
      get: vitest.fn().mockResolvedValue([expectedJob]),
      set: vitest.fn(),
      getMeta: vitest.fn(),
      setMeta: vitest.fn(),
      lastCacheSync: vitest.fn()
    }

    // when
    const job = await ReadJob(mockCacheService)(
      expectedJob.repository.group,
      expectedJob.repository.repo,
      expectedJob.id
    )

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
      repository: {
        group: 'group',
        repo: 'repo'
      },
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

    const mockCacheService: CacheService = {
      get: vitest.fn().mockResolvedValue([]),
      set: vitest.fn(),
      getMeta: vitest.fn(),
      setMeta: vitest.fn(),
      lastCacheSync: vitest.fn()
    }

    // when
    const job = ReadJob(mockCacheService)(
      expectedJob.repository.group,
      expectedJob.repository.repo,
      expectedJob.id
    )

    // then
    await expect(job).rejects.toThrow()
  })
})
