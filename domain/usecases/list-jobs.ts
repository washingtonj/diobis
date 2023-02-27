import { JobEntity } from '@/domain/entities'
import { GitHubService, CacheService } from '@/domain/interfaces'
import { JOB_META_KEY } from '@/domain/consts/metas'

export function ListJobs (GitHubService: GitHubService, CacheService: CacheService) {
  return async function () {
    const lastCacheSync = await CacheService.lastCacheSync(JOB_META_KEY)
    const isInvalidCache = !lastCacheSync || new Date().getTime() - (lastCacheSync.getTime() || 0) > 3600000

    const raw = isInvalidCache
      ? await GitHubService.getAllJobs()
      : await CacheService.get<JobEntity[]>('jobs')

    const filtered = raw.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))

    if (isInvalidCache) { await CacheService.set('jobs', raw) }

    return filtered
  }
}
