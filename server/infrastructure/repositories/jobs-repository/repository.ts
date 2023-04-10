import { JobRepository, GitHubService, CacheService } from '@/server/domain/interfaces'
import { JobEntity } from '@/server/domain/entities'

type JobRepositoryDI = {
  GitHubService: GitHubService,
  CacheService: CacheService
}

const JOB_META_KEY = 'jobs'

export function JobRepository (DI: JobRepositoryDI): JobRepository {
  return {
    async getAll () {
      const oneHourInMilliseconds = 1000 * 60 * 60

      const lastCacheSync = await DI.CacheService.lastCacheSync(JOB_META_KEY)
      const isInvalidCache = lastCacheSync === null || +new Date() - +new Date(lastCacheSync) > oneHourInMilliseconds

      const raw = isInvalidCache
        ? await DI.GitHubService.getAllJobs()
        : await DI.CacheService.get<JobEntity[]>('jobs')

      if (isInvalidCache) {
        await DI.CacheService.set('jobs', raw)
      }

      return raw
    }
  }
}
