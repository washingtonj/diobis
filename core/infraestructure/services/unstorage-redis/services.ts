import { createStorage, Storage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'
import { CacheService } from '@/core/domain/interfaces'
import { Logger } from '@/utils'

export function UnstorageRedis (storageInstance?: Storage): CacheService {
  Logger('UnstorageRedis', 'Instance created')

  const storage = storageInstance || createStorage({
    driver: redisDriver({
      base: 'unstorage',
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    })
  })

  return {
    async get<T> (key: string) {
      const data = await storage.getItem(key)

      Logger('UnstorageRedis', `Get ${key}`)

      return data as T
    },

    async set (key, value) {
      await storage.setMeta(key, { lastCacheSync: new Date() })

      Logger('UnstorageRedis', `Set ${key}`)

      return storage.setItem(key, value)
    },

    async lastCacheSync (key) {
      const { lastCacheSync } = await storage.getMeta(key)

      if (lastCacheSync) {
        return new Date(lastCacheSync as string)
      }

      return null
    }
  }
}
