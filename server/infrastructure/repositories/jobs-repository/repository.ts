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
    }
  }
}
