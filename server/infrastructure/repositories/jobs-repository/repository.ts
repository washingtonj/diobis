import { JobRepository, GitHubService, CacheService } from '@/server/domain/interfaces'
import { JobCommentEntity, JobEntity } from '@/server/domain/entities'

type JobRepositoryDI = {
  GitHubService: GitHubService,
  CacheService: CacheService
}

const JOB_META_KEY = 'jobs'

export function JobRepository (DI: JobRepositoryDI): JobRepository {
  return {
    async getAll () {
      const ThirtyMinutesInMilliseconds = 30 * 60 * 1000

      const lastCacheSync = await DI.CacheService.lastCacheSync(JOB_META_KEY)
      const isInvalidCache = lastCacheSync === null || +new Date() - +new Date(lastCacheSync) > ThirtyMinutesInMilliseconds

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

      // {group}/{repo}/{id}
      const [group, repo, jobId] = atob(id).split('/')

      return DI.GitHubService.getJobById(group, repo, jobId)
    },

    async getComments (id) {
      const [group, repo, jobId] = atob(id).split('/')

      const ThirtyMinutesInMilliseconds = 30 * 60 * 1000
      const cacheKey = `${id}/comments`

      const lastCacheSync = await DI.CacheService.lastCacheSync(cacheKey)
      const isInvalidCache = lastCacheSync === null || +new Date() - +new Date(lastCacheSync) > ThirtyMinutesInMilliseconds

      const raw = isInvalidCache
        ? await DI.GitHubService.getJobComments(group, repo, jobId)
        : await DI.CacheService.get<JobCommentEntity[]>(cacheKey)

      if (isInvalidCache) { await DI.CacheService.set(cacheKey, raw) }

      return raw
    },

    async putComment (id, comment) {
      const [group, repo, jobId] = atob(id).split('/')

      const raw = await DI.GitHubService.createComment(group, repo, jobId, comment)

      await DI.CacheService.set(`${id}/comments`, [...await this.getComments(id), raw])

      return raw
    }
  }
}
