import { describe, it, expect, vitest } from 'vitest'
import { CacheService, GitHubService } from '@/server/domain/interfaces'
import { JobRepository as JobRepositoryImpl } from '@/server/infrastructure/repositories'
import { JobCommentEntity } from '~~/server/domain/entities'

describe('JobRepository', () => {
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
    const jobs = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getAll()

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
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue(expectedJobs)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date()),
      get: vitest.fn().mockResolvedValue(expectedJobs)
    }

    // when
    const jobs = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getAll()

    // then
    expect(jobs).toEqual(expectedJobs)
  })

  it('Should get a job from GitHub Service', async () => {
    // given
    const expectedJob = {
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

    const mockGitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue([]),
      getJobById: vitest.fn().mockResolvedValue(expectedJob)
    }

    const mockCacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const job = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getUnique('id')

    // then
    expect(job).toEqual(expectedJob)
  })

  it('Should get a job from jobs list', async () => {
    // given
    const expectedJob = {
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

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getAllJobs: vitest.fn().mockResolvedValue([expectedJob]),
      getJobById: vitest.fn().mockResolvedValue(expectedJob)
    }

    const mockCacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const job = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getUnique(expectedJob.id)

    // then
    expect(job).toEqual(expectedJob)
  })

  it('Should get the job comments from GitHub Service', async () => {
    // given
    const expectedComment = {
      id: 'id',
      markdown: 'Job Description',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      }
    }

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue(expectedComment)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const comment = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getComments('id')

    // then
    expect(comment).toEqual(expectedComment)
  })

  it('Should get the job comments from Cache Service', async () => {
    // given
    const expectedComment = {
      id: 'id',
      markdown: 'Job Description',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      }
    }

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue(expectedComment)
    }

    const mockCacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(new Date()),
      get: vitest.fn().mockResolvedValue(expectedComment)
    }

    // when
    const comment = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).getComments('id')

    // then
    expect(comment).toEqual(expectedComment)
  })

  it('Should put a job comment', async () => {
    // given
    const comment: JobCommentEntity = {
      body: 'comment',
      created_at: '2021-01-01T00:00:00Z',
      id: 'id',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      }
    }

    const mockGitHubService: GitHubService = {
      ...{} as GitHubService,
      getJobComments: vitest.fn().mockResolvedValue([]),
      createComment: vitest.fn().mockResolvedValue(comment)
    }

    const mockCacheService: CacheService = {
      ...{} as CacheService,
      set: vitest.fn(),
      lastCacheSync: vitest.fn().mockResolvedValue(null)
    }

    // when
    const result = await JobRepositoryImpl({
      CacheService: mockCacheService,
      GitHubService: mockGitHubService
    }).putComment('id', 'comment')

    // then
    expect(result).toEqual(comment)
  })
})
