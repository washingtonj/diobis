import { describe, it, expect } from 'vitest'
import { GitHubComment, GitHubIssue, GitHubUser } from '@/server/infrastructure/adapters/github-api/models'
import { Transform } from '@/server/infrastructure/adapters/github-api/transforms'
import { JobCommentEntity, JobEntity, UserEntity } from '@/server/domain/entities'

describe('Transform', () => {
  it('Should transform to JobEntity', () => {
    // given
    const data: GitHubIssue = {
      number: 1,
      title: 'Job title',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'user'
      },
      labels: [
        {
          name: 'label'
        }
      ],
      body: 'Job description',
      reactions: {
        confused: 1,
        eyes: 2,
        heart: 3,
        rocket: 4
      },
      comments: 5
    }

    const repo = {
      group: 'group',
      repo: 'repo'
    }

    const expected: JobEntity = {
      id: '67726f75702f7265706f2f31',
      title: 'Job title',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'user'
      },
      tags: ['label'],
      markdown: 'Job description',
      reactions: {
        confused: 1,
        eyes: 2,
        heart: 3,
        rocket: 4
      },
      interactions: {
        comments: 5
      }
    }

    // when
    const result = Transform.toJobEntity(data, repo)

    // then
    expect(result).toEqual(expected)
  })

  it('Should transform to JobCommentEntity', () => {
    // given
    const data: GitHubComment = {
      id: 1,
      body: 'Comment body',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'user'
      }
    }

    const expected: JobCommentEntity = {
      id: '1',
      body: 'Comment body',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'user'
      }
    }

    // when
    const result = Transform.toJobCommentEntity(data)

    // then
    expect(result).toEqual(expected)
  })

  it('Should transform to UserEntity', () => {
    // given
    const data: GitHubUser = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login: 'user'
    }

    const expected: UserEntity = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login_id: 'user'
    }

    // when
    const result = Transform.toUserEntity(data)

    // then
    expect(result).toEqual(expected)
  })

  it('Should transform id to Hex using toCriptedId', () => {
    // given
    const id = '1'

    // when
    const result = Transform.toCriptedId({ group: 'group', repo: 'repo', id })

    // then
    expect(result).toEqual('67726f75702f7265706f2f31')
  })

  it('Should transform hex to Id using fromCriptedId', () => {
    // given
    const id = '67726f75702f7265706f2f31'

    // when
    const result = Transform.fromCriptedId(id)

    // then
    expect(result).toEqual({ group: 'group', repo: 'repo', id: '1' })
  })
})