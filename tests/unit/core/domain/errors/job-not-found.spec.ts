import { describe, it, expect } from 'vitest'
import { JobNotFoundError } from '@/core/domain/errors'

describe('JobNotFoundError', () => {
  it('Should be an instance of Error', () => {
    const error = new JobNotFoundError({ group: 'group', repo: 'repo', id: 'id' })
    expect(error).toBeInstanceOf(Error)
  })

  it('Should have a name property', () => {
    const error = new JobNotFoundError({ group: 'group', repo: 'repo', id: 'id' })
    expect(error).toHaveProperty('name')
  })
})
