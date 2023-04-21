import { GitHubComment, GitHubIssue, GitHubUser } from './models'
import { JobEntity, JobCommentEntity, UserEntity } from '@/server/domain/entities'

export const Transform = {
  toCriptedId (data: { group: string, repo: string, id: string }): string {
    return Buffer.from(`${data.group}/${data.repo}/${data.id}`).toString('hex')
  },

  fromCriptedId (id: string): { group: string, repo: string, id: string } {
    const [group, repo, id_] = Buffer.from(id, 'hex').toString().split('/')
    return { group, repo, id: id_ }
  },

  toJobEntity (data: GitHubIssue, repo: { group: string, repo: string }): JobEntity {
    return {
      id: this.toCriptedId({ id: String(data.number), ...repo }),
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

  toJobCommentEntity (data: GitHubComment): JobCommentEntity {
    return {
      id: String(data.id),
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
