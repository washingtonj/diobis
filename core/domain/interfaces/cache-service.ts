export interface CacheService {
  get<T>(key: string): Promise<T>
  set(key: string, value: any): Promise<void>
  lastCacheSync(key: string): Promise<Date | null>
}
