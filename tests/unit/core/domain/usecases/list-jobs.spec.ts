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

    const mockGitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs)
    }

    const mockCacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
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

    const mockGitHubService = {
      ...{} as GitHubService
    }

    const mockCacheService = {
      ...{} as CacheService,
      get: vitest.fn().mockResolvedValue(expectedJobs),
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

    const mockGitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const jobs = await ListJobs(mockGitHubService, mockCacheService)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })

  it('Should update the cache service if cache is outdated', async () => {
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

    const mockGitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date('2021-01-01T00:00:00Z'))
    }

    // when
    const jobs = await ListJobs(mockGitHubService, mockCacheService)()

    // then
    expect(jobs).toEqual(expectedJobs)
  })
})