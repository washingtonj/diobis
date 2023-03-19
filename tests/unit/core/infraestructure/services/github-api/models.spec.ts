import { describe, it, expect } from 'vitest'
import { GitHubComment, GitHubIssue, GitHubOAuth, GitHubUser } from '@/core/infraestructure/repositories/github-api/models'

describe('models', () => {
  it('Should have the correct data type (GitHubComment)', () => {
    const comment: GitHubComment = {
      body: 'Comment Body',
      created_at: '2021-01-01T00:00:00Z',
      number: 1,
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'login_id'
      }
    }

    expect(typeof comment.body).toBe('string')
    expect(typeof comment.created_at).toBe('string')
    expect(typeof comment.number).toBe('number')
    expect(typeof comment.user).toBe('object')
    expect(typeof comment.user.avatar_url).toBe('string')
    expect(typeof comment.user.login).toBe('string')
  })

  it('Should have the correct data type (GitHubIssue)', () => {
    const issue: GitHubIssue = {
      body: 'Issue Body',
      comments: 1,
      labels: [
        {
          name: 'name'
        }
      ],
      reactions: {
        confused: 1,
        eyes: 1,
        heart: 1,
        rocket: 1
      },
      created_at: '2021-01-01T00:00:00Z',
      number: 1,
      title: 'Issue Title',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login: 'login_id'
      }
    }

    expect(typeof issue.body).toBe('string')
    expect(typeof issue.created_at).toBe('string')
    expect(typeof issue.number).toBe('number')
    expect(typeof issue.title).toBe('string')
    expect(typeof issue.user).toBe('object')
    expect(typeof issue.user.avatar_url).toBe('string')
    expect(typeof issue.user.login).toBe('string')
  })

  it('Should have the correct data type (GitHubOAuth)', () => {
    const oAuth: GitHubOAuth = {
      access_token: 'access_token',
      scope: 'scope',
      token_type: 'token_type'
    }

    expect(typeof oAuth.access_token).toBe('string')
    expect(typeof oAuth.scope).toBe('string')
    expect(typeof oAuth.token_type).toBe('string')
  })

  it('Should have the correct data type (GitHubUser)', () => {
    const user: GitHubUser = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login: 'login_id'
    }

    expect(typeof user.avatar_url).toBe('string')
    expect(typeof user.login).toBe('string')
  })
})
