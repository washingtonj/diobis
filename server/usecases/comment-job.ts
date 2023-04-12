import { CacheService, GitHubService } from '@/server/domain/interfaces'
import { JobCommentEntity } from '@/server/domain/entities'

export function commentJob (GitHubService: GitHubService, CacheService: CacheService) {
  return async function (group: string, repo: string, id: string, comment: string) {
    const cacheKey = 'SOME_CACHE_KEY'

    const newComment = await GitHubService.createComment(group, repo, id, comment)
    const cacheComments = await CacheService.get<JobCommentEntity[]>(cacheKey)

    if (cacheComments) {
      const newestComments = [newComment, ...cacheComments]
      await CacheService.set(cacheKey, newestComments)
      return newestComments
    }

    return newComment
  }
}
