import { UserEntity } from '@/core/domain/entities'

export interface CommentEntity {
  id: string
  body: string
  created_at: string
  user: UserEntity
}
