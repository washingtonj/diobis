import { describe, it, expect } from 'vitest'
import { InvalidGitHubOAuthCodeError } from '@/server/domain/errors'

describe('InvalidGitHubOAuthCodeError', () => {
  it('Should be an instance of Error', () => {
    const error = new InvalidGitHubOAuthCodeError({ code: 'code', state: 'state' })
    expect(error).toBeInstanceOf(Error)
  })

  it('Should have a name property', () => {
    const error = new InvalidGitHubOAuthCodeError({ code: 'code', state: 'state' })
    expect(error).toHaveProperty('name')
  })
})
