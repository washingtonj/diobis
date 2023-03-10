export interface CacheService {
  get<T>(key: string): Promise<T>
  set(key: string, value: any): Promise<void>
  getMeta(key: string): Promise<string>
  setMeta(key: string, value: string): Promise<void>
  lastCacheSync(key: string): Promise<Date | null>
}
