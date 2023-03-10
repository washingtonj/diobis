import { JobEntity } from '@/core/domain/entities'
import { GitHubService, CacheService } from '@/core/domain/interfaces'
import { JOB_META_KEY } from '@/core/domain/consts/metas'

const REMOVED_JOBS = ['ATENÇÃO: Leia nossas regras', 'ATENÇÃO: Leia nossas regras.']

export function ListJobs (GitHubService: GitHubService, CacheService: CacheService) {
  return async function () {
    const lastCacheSync = await CacheService.lastCacheSync(JOB_META_KEY)
    const isInvalidCache = !lastCacheSync || new Date().getTime() - (lastCacheSync.getTime() || 0) > 3600000

    const raw = isInvalidCache
      ? await GitHubService.getAllJobs()
      : await CacheService.get<JobEntity[]>('jobs')

    const filtered = raw
      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
      .filter(job => !REMOVED_JOBS.includes(job.title))

    if (isInvalidCache) { await CacheService.set('jobs', raw) }

    return filtered
  }
}
