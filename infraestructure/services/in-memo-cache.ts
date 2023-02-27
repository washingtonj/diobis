import { CacheService } from '@/domain/interfaces'
import { Logger } from '@/utils'

export const InMemoryCache: CacheService = {
  async get<T> (key: string) {
    const data = await useStorage<T>().getItem(key)
    if (data) { Logger('CacheService', `${key} found in cache`) }
    return data
  },

  set: async (key, value) => {
    const dateString = new Date().toISOString()
    await useStorage().setItem(key, value)
    await InMemoryCache.setMeta(`${key}_lastSync`, dateString)
  },

  getMeta (key) {
    return useStorage().getItem(key)
  },

  setMeta (key, value) {
    return useStorage().setItem(key, value)
  },

  lastCacheSync: async (key) => {
    const dateString = await InMemoryCache.getMeta(`${key}_lastSync`)
    return dateString ? new Date(dateString) : null
  }
}
