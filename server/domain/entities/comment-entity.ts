import { UserEntity } from '@/server/domain/entities'

export interface CommentEntity {
  id: string
  body: string
  created_at: string
  user: UserEntity
}
