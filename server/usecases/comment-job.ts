import { CacheService, GitHubService } from '@/server/domain/interfaces'
import { COMMENT_META_KEY } from '@/server/domain/consts/metas'
import { CommentEntity } from '@/server/domain/entities'

export function commentJob (GitHubService: GitHubService, CacheService: CacheService) {
  return async function (group: string, repo: string, id: string, comment: string) {
    const cacheKey = COMMENT_META_KEY(group, repo, id)

    const newComment = await GitHubService.createComment(group, repo, id, comment)
    const cacheComments = await CacheService.get<CommentEntity[]>(cacheKey)

    if (cacheComments) {
      const newestComments = [newComment, ...cacheComments]
      await CacheService.set(cacheKey, newestComments)
      return newestComments
    }

    return newComment
  }
}
