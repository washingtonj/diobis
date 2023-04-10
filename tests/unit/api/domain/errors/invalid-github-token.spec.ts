import { describe, it, expect } from 'vitest'
import { InvalidGitHubToken } from '@/server/domain/errors'

describe('InvalidGitHubToken', () => {
  it('Should be an instance of Error', () => {
    const error = new InvalidGitHubToken({ code: 'code' })
    expect(error).toBeInstanceOf(Error)
  })

  it('Should have a name property', () => {
    const error = new InvalidGitHubToken({ code: 'code' })
    expect(error).toHaveProperty('name')
  })
})
