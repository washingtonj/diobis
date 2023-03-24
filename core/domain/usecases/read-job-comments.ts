import { GitHubService, CacheService } from '@/core/domain/interfaces'
import { CommentEntity } from '@/core/domain/entities'

export function ReadJobComments (GitHubService: GitHubService, CacheService: CacheService) {
  return async function (group: string, repo: string, id: string) {
    const cacheKey = `comment/${group}/${repo}/${id}`
    const oneHourInMilliseconds = 1000 * 60 * 60

    const lastCacheSync = await CacheService.lastCacheSync(cacheKey)
    const isInvalidCache = lastCacheSync === null || +new Date() - +new Date(lastCacheSync) > oneHourInMilliseconds

    const raw = isInvalidCache
      ? await GitHubService.getJobComments(group, repo, id)
      : await CacheService.get<CommentEntity[]>(cacheKey)

    const filtered = raw.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))

    if (isInvalidCache) { await CacheService.set(cacheKey, raw) }

    return filtered
  }
}
