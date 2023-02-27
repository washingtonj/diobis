export interface CommentEntity {
  id: string
  body: string
  created_at: string
  user: {
    login: string
    avatar_url: string
  }
}
