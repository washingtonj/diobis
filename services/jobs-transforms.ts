import { GitHubResponseDTO } from './jobs-dtos'
import { JobModel } from './jobs-models'

type Repository = {
  owner: string
  repo: string
}

export function toBufferedJobId (id: string | number, repository: Repository) {
  return btoa(`${repository.owner}/${repository.repo}/${id}`)
}

export function fromBufferedJobId (id: string) {
  const [owner, repo, number] = atob(id).split('/')
  return { owner, repo, id: String(number) }
}

export function toJobModel (response: GitHubResponseDTO): JobModel {
  return {
    id: response.number.toString(),
    created_at: response.created_at,
    markdown: response.body,
    tags: response.labels.map(label => label.name),
    title: response.title,
    user: {
      avatar_url: response.user.avatar_url,
      login_id: response.user.login
    },
    reactions: {
      confused: response.reactions.confused,
      eyes: response.reactions.eyes,
      heart: response.reactions.heart,
      rocket: response.reactions.rocket
    },
    interactions: {
      comments: response.comments
    }
  }
}
