import { describe, it, expect, vi } from 'vitest'
import { Logger } from '@/utils/logger'

describe('Logger', () => {
  it('Should log if environment is DEVELOPMENT', () => {
    // Given
    vi.stubEnv('NODE_ENV', 'development')

    const propertyKey = 'test'
    const msg = 'test message'
    const spy = vi.spyOn(console, 'log')

    // When
    Logger(propertyKey, msg)

    // Then
    expect(spy).toHaveBeenCalled()
  })
})
