import { UserModel } from '@/services/user-models'

interface ReactionsModel {
  confused?: number
  heart?: number
  rocket?: number
  eyes?: number
}

interface InteractionsModel {
  comments?: number
}

export interface JobModel {
  id: string
  title: string
  created_at: string
  markdown: string
  tags: string[]
  user: UserModel
  reactions?: ReactionsModel
  interactions?: InteractionsModel
}
