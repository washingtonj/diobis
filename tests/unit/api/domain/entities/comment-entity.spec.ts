import { describe, it, expect } from 'vitest'
import { JobCommentEntity } from '@/server/domain/entities'

describe('JobCommentEntity', () => {
  it('Should have the correct data types', () => {
    const comment: JobCommentEntity = {
      id: 'id',
      body: 'Comment Body',
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        login_id: 'login_id'
      },
      created_at: '2021-01-01T00:00:00Z'
    }

    expect(typeof comment.id).toBe('string')
    expect(typeof comment.body).toBe('string')
    expect(typeof comment.user.avatar_url).toBe('string')
    expect(typeof comment.user.login_id).toBe('string')
    expect(typeof comment.created_at).toBe('string')
  })
})
