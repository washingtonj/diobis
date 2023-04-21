import { UserEntity } from '@/server/domain/entities'

export interface JobEntity {
  id: string
  title: string
  created_at: string
  markdown: string
  tags: string[]
  user: UserEntity
  reactions?: {
    confused?: number
    heart?: number
    rocket?: number
    eyes?: number
  },
  interactions?: {
    comments?: number
  }
}

export interface JobCommentEntity {
  id: string
  body: string
  created_at: string
  user: UserEntity
}
