import { GitHubComment, GitHubIssue, GitHubUser } from './models'
import { JobEntity, CommentEntity, UserEntity } from '@/server/domain/entities'

export const Transform = {

  toJobEntity (data: GitHubIssue, repo: { group: string, repo: string }): JobEntity {
    return {
      id: btoa(`${repo.group}/${repo.repo}/${String(data.number)}`),
      title: data.title,
      created_at: data.created_at,
      user: {
        avatar_url: data.user.avatar_url,
        login_id: data.user.login
      },
      tags: data.labels.map((item: any) => item.name),
      markdown: data.body,
      reactions: {
        confused: data.reactions.confused,
        eyes: data.reactions.eyes,
        heart: data.reactions.heart,
        rocket: data.reactions.rocket
      },
      interactions: {
        comments: data.comments
      }
    }
  },

  toCommentEntity (data: GitHubComment): CommentEntity {
    return {
      id: String(data.number),
      body: data.body,
      created_at: data.created_at,
      user: {
        avatar_url: data.user.avatar_url,
        login_id: data.user.login
      }
    }
  },

  toUserEntity (data: GitHubUser): UserEntity {
    return {
      avatar_url: data.avatar_url,
      login_id: data.login
    }
  }
}
