import { JobRepository } from '@/server/domain/interfaces'
import { CacheService, GitHubService } from '@/server/infrastructure/interfaces'
import { JobCommentEntity, JobEntity } from '@/server/domain/entities'

type JobRepositoryDI = {
  GitHubService: GitHubService,
  CacheService: CacheService
}

export function JobRepository (DI: JobRepositoryDI): JobRepository {
  const JOB_META_KEY = 'jobs'

  async function validateCache (cacheKey: string) {
    const ThirtyMinutesInMilliseconds = 30 * 60 * 1000
    const lastCacheSync = await DI.CacheService.lastCacheSync(cacheKey)

    const isInvalidCache = lastCacheSync === null || +new Date() - +new Date(lastCacheSync) > ThirtyMinutesInMilliseconds

    if (isInvalidCache) { return true }

    return false
  }

  return {
    async getAll () {
      const isInvalidCache = await validateCache(JOB_META_KEY)

      const raw = isInvalidCache
        ? await DI.GitHubService.getAllJobs()
        : await DI.CacheService.get<JobEntity[]>('jobs')

      if (isInvalidCache) {
        await DI.CacheService.set('jobs', raw)
      }

      return raw
    },

    async getUnique (id) {
      const jobs = await this.getAll()
      const jobsExistOnList = jobs?.find(job => job.id === id)

      if (jobsExistOnList) { return jobsExistOnList }

      return DI.GitHubService.getJobById(id)
    },

    async getComments (id) {
      const CACHE_KEY = `${id}/comments`

      const isInvalidCache = await validateCache(CACHE_KEY)

      const raw = isInvalidCache
        ? await DI.GitHubService.getJobComments(id)
        : await DI.CacheService.get<JobCommentEntity[]>(CACHE_KEY)

      if (isInvalidCache) { await DI.CacheService.set(CACHE_KEY, raw) }

      return raw
    },

    async putComment (id, comment) {
      const raw = await DI.GitHubService.createComment(id, comment)

      await DI.CacheService.set(`${id}/comments`, [...await this.getComments(id), raw])

      return raw
    }
  }
}
