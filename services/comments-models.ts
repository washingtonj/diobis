import { UserModel } from '@/services/shared-models'

export interface CommentsModel {
  id: string
  body: string
  created_at: string
  user: UserModel
}
