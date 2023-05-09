import { UserModel } from '@/services/user-models'

export interface CommentsModel {
  id: string
  body: string
  created_at: string
  user: UserModel
}
