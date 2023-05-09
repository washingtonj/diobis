import { GitHubUserDTO } from '@/services/user-dtos'

export interface GitHubCommentDTO {
  id: number
  body: string
  created_at: string
  user: GitHubUserDTO
}
