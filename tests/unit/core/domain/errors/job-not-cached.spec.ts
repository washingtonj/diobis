import { describe, it, expect } from 'vitest'
import { JobNotCached } from '@/core/domain/errors'

describe('JobNotCached', () => {
  it('Should be an instance of Error', () => {
    const error = new JobNotCached({ group: 'group', repo: 'repo', id: 'id' })
    expect(error).toBeInstanceOf(Error)
  })

  it('Should have a name property', () => {
    const error = new JobNotCached({ group: 'group', repo: 'repo', id: 'id' })
    expect(error).toHaveProperty('name')
  })
})
