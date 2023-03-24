import { describe, it, expect } from 'vitest'
import { GitHubComment, GitHubIssue, GitHubUser } from '@/core/infraestructure/services/github-api/models'
import { Transform } from '~~/core/infraestructure/services/github-api/transforms'
import { CommentEntity, JobEntity, UserEntity } from '@/core/domain/entities'

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
      id: '1',
      title: 'Job title',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'user'
      },
      repository: {
        group: 'group',
        repo: 'repo'
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

  it('Should transform to CommentEntity', () => {
    // given
    const data: GitHubComment = {
      number: 1,
      body: 'Comment body',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'user'
      }
    }

    const expected: CommentEntity = {
      id: '1',
      body: 'Comment body',
      created_at: '2021-01-01',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'user'
      }
    }

    // when
    const result = Transform.toCommentEntity(data)

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
})
