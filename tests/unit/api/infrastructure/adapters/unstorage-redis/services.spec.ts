
import { vi, describe, it, expect } from 'vitest'
import { Storage } from 'unstorage'
import { UnstorageRedis } from '@/server/infrastructure/adapters'

describe('UnstorageRedis', () => {
  it('Should create a self storage instance if not injected', () => {
    // When
    const result = UnstorageRedis()

    // Then
    expect(result).toBeDefined()
  })

  it('Should get a value from cache', async () => {
    // Given
    const mockedStorage = {
      ...{} as Storage,
      getItem: vi.fn().mockResolvedValue('value')
    }

    // When
    const result = await UnstorageRedis(mockedStorage).get('key')

    // Then
    expect(result).toBe('value')
  })

  it('Should set a value in cache', async () => {
    // Given
    const mockedStorage = {
      ...{} as Storage,
      setItem: vi.fn(),
      setMeta: vi.fn()
    }

    // When
    await UnstorageRedis(mockedStorage).set('key', 'value')

    // Then
    expect(mockedStorage.setItem).toBeCalled()
  })

  it('Should get last cache sync', async () => {
    // Given
    const mockedStorage = {
      ...{} as Storage,
      getMeta: vi.fn().mockResolvedValue({ lastCacheSync: '2021-08-05T18:00:00.000Z' })
    }

    // When
    const result = await UnstorageRedis(mockedStorage).lastCacheSync('key')

    // Then
    expect(result).toBeInstanceOf(Date)
    expect(result?.toISOString()).toBe('2021-08-05T18:00:00.000Z')
  })

  it('Should return null if last cache sync is not defined', async () => {
    // Given
    const mockedStorage = {
      ...{} as Storage,
      getMeta: vi.fn().mockResolvedValue({})
    }

    // When
    const result = await UnstorageRedis(mockedStorage).lastCacheSync('key')

    // Then
    expect(result).toBeNull()
  })
})
