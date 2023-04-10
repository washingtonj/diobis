import { describe, it, expect, vitest } from 'vitest'
import { GetJobs } from '@/server/usecases'
import { JobRepository } from '@/server/domain/interfaces'

describe('GetJobs', () => {
  it('Should list all jobs', async () => {
    // given
    const expectedJobs = [
      {
        created_at: '2021-01-01T00:00:00Z',
        id: 'id',
        title: 'Job Title',
        markdown: 'Job Description',
        repository: {
          group: 'group',
          repo: 'repo'
        },
        labels: ['label1', 'label2'],
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
    ]

    const mockJobRepository: JobRepository = {
      ...{} as JobRepository,
      getAll: vitest.fn().mockResolvedValue(expectedJobs)
    }

    // when
    const jobs = await GetJobs(mockJobRepository)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })
})
