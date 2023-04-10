import { describe, vi, it, expect, beforeEach } from 'vitest'

import { GitHubAPI } from '~~/server/infrastructure/services/github-api/services'
import { GitHubComment, GitHubIssue, GitHubOAuth, GitHubUser } from '~~/server/infrastructure/services/github-api/models'
import { CommentEntity, JobEntity, UserEntity } from '@/server/domain/entities'

const mockedFetch = vi.fn()

describe('GitHubAPI', () => {
  beforeEach(() => {
    mockedFetch.mockClear()
  })

  it('Should return all jobs from service', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue([])

    // When
    const repositories = await GitHubAPI().getAllJobs()

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
    const job = await GitHubAPI().getJobById('group', 'repo', 'id')

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

    const comments = await GitHubAPI().getJobComments('group', 'repo', 'id')

    // Then
    expect(comments).toEqual([])
  })

  it('Should throw an error when job doesnt exist', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue(undefined)

    const job = GitHubAPI().getJobById('group', 'repo', 'id')

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

    const token = await GitHubAPI().getAuthToken('code')

    // Then
    expect(token).toEqual({ token: 'token', type: 'Bearer' })
  })

  it('Should throw an erro when auth token is invalid', async () => {
    // When
    (global as any).$fetch = mockedFetch.mockResolvedValue({})

    const token = GitHubAPI().getAuthToken('code')

    // Then
    await expect(token).rejects.toThrow()
  })

  it('Should use the GH Authorization on requests', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue([])

    // When
    await GitHubAPI({ authorization: 'Bearer token' }).getAllJobs()

    // Then
    expect(mockedFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer token')
  })

  it('Should get user information from service', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue({ avatar_url: 'some_avatar', login: 'some_login' } as GitHubUser)

    // When
    const user = await GitHubAPI().getUserByToken('TOKEN')

    // Then
    expect(mockedFetch.mock.calls[0][1].headers.Authorization).toBe('Bearer TOKEN')
    expect(user).toEqual({ avatar_url: 'some_avatar', login_id: 'some_login' } as UserEntity)
  })

  it('Should throw an error when user token is invalid or expired', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue(undefined)

    // When
    const user = GitHubAPI().getUserByToken('TOKEN')

    // Then
    await expect(user).rejects.toThrow()
  })

  it('Should comment an issue and return the comment entity', async () => {
    // Given
    (global as any).$fetch = mockedFetch.mockResolvedValue({
      body: 'comment',
      created_at: '2021-01-01T00:00:00Z',
      number: 1,
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'login_id'
      }
    } as GitHubComment)

    // When
    const comment = await GitHubAPI().createComment('group', 'repo', 'id', 'comment')

    // Then
    expect(comment).toEqual({
      body: 'comment',
      created_at: '2021-01-01T00:00:00Z',
      id: '1',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      }
    } as CommentEntity)
  })
})
