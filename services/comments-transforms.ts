import { GitHubCommentDTO } from './comments-dtos'
import { CommentsModel } from './comments-models'

export function toCommentModel (dto: GitHubCommentDTO): CommentsModel {
  return {
    id: String(dto.id),
    body: dto.body,
    created_at: dto.created_at,
    user: {
      avatar_url: dto.user.avatar_url,
      login_id: dto.user.login
    }
  }
}
