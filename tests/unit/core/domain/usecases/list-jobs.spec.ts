import { describe, it, expect, vitest } from 'vitest'
import { ListJobs } from '@/core/domain/usecases'
import { CacheService, GitHubService } from '@/core/domain/interfaces'

describe('ListJobs', () => {
  it('Should list all jobs from GitHub Service', async () => {
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

    const mockGitHubService: GitHubService = {
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs),
      getAuthToken: vitest.fn(),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn()
    }

    const mockCacheService: CacheService = {
      get: vitest.fn(),
      set: vitest.fn(),
      getMeta: vitest.fn(),
      setMeta: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const jobs = await ListJobs(mockGitHubService, mockCacheService)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })

  it('Should list all jobs from Cache Service', async () => {
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

    const mockGitHubService: GitHubService = {
      getAllJobs: vitest.fn(),
      getAuthToken: vitest.fn(),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn()
    }

    const mockCacheService: CacheService = {
      get: vitest.fn().mockResolvedValue(expectedJobs),
      set: vitest.fn(),
      getMeta: vitest.fn(),
      setMeta: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date())
    }

    // when
    const jobs = await ListJobs(mockGitHubService, mockCacheService)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })

  it('Should update the cache service if cache is invalid', async () => {
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

    const mockGitHubService: GitHubService = {
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs),
      getAuthToken: vitest.fn(),
      getJobById: vitest.fn(),
      getJobComments: vitest.fn()
    }

    const mockCacheService: CacheService = {
      get: vitest.fn(),
      set: vitest.fn(),
      getMeta: vitest.fn(),
      setMeta: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const jobs = await ListJobs(mockGitHubService, mockCacheService)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })
})
