import { GitHubUserDTO } from '@/services/shared-dtos'

interface GitHubReactions {
  confused: number
  eyes: number
  heart: number
  rocket: number
}

interface GitHubLabels {
  name: string
}

export interface GitHubResponseDTO {
  number: number
  title: string
  created_at: string
  user: GitHubUserDTO
  labels: Array<GitHubLabels>
  body: string
  reactions: GitHubReactions
  comments: number
}
