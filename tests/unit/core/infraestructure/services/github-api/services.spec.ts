import { describe, vi, it, expect, beforeEach } from 'vitest'

import { GitHubAPI } from '@/core/infraestructure/repositories/github-api/services'
import { GitHubIssue, GitHubOAuth } from '@/core/infraestructure/repositories/github-api/models'
import { JobEntity } from '@/core/domain/entities'

const mockedFetch = vi.fn()

describe('GitHubAPI', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
  })

  it('Should return all jobs from service', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue([])

    // When
    const repositories = await GitHubAPI.getAllJobs()

    // Then
    expect(repositories).toEqual([])
  })

  it('Should return a job from service', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue({
      created_at: '2021-01-01T00:00:00Z',
      title: 'Job Title',
      body: 'Job Description',
      comments: 1,
      labels: [{ name: 'label1' }, { name: 'label2' }],
      number: 1,
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      },
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'login_id'
      }
    } as GitHubIssue)

    // When
    const job = await GitHubAPI.getJobById('group', 'repo', 'id')

    // Then
    expect(job).toEqual({
      id: '1',
      created_at: '2021-01-01T00:00:00Z',
      title: 'Job Title',
      markdown: 'Job Description',
      repository: {
        group: 'group',
        repo: 'repo'
      },
      tags: ['label1', 'label2'],
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
    } as JobEntity)
  })

  it('Should return a job comments from service', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue([])

    const comments = await GitHubAPI.getJobComments('group', 'repo', 'id')

    // Then
    expect(comments).toEqual([])
  })

  it('Shouldnt throw an error when job doesnt exist', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue(undefined)

    const job = GitHubAPI.getJobById('group', 'repo', 'id')

    // Then
    await expect(job).rejects.toThrow()
  })

  it('Should return the auth token from service', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue({
      access_token: 'token',
      token_type: 'Bearer',
      scope: 'repo'
    } as GitHubOAuth)

    const token = await GitHubAPI.getAuthToken('code')

    // Then
    expect(token).toEqual('Bearer token')
  })

  it('Should throw an erro when auth token is invalid', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue({})

    const token = GitHubAPI.getAuthToken('code')

    // Then
    await expect(token).rejects.toThrow()
  })
})
