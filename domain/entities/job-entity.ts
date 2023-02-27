import { UserEntity } from '@/domain/entities'

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
  repository: {
    group: string
    repo: string
  }
}
