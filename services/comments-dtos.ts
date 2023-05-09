import { GitHubUserDTO } from '@/services/shared-dtos'

export interface GitHubCommentDTO {
  id: number
  body: string
  created_at: string
  user: GitHubUserDTO
}
