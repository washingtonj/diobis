import { describe, it, expect } from 'vitest'
import { UserEntity } from '@/server/domain/entities'

describe('UserEntity', () => {
  it('Should have the correct data types', () => {
    const user: UserEntity = {
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      login_id: 'login_id'
    }

    expect(typeof user.avatar_url).toBe('string')
    expect(typeof user.login_id).toBe('string')
  })
})
