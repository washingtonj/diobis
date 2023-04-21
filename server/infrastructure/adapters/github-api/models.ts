export interface GitHubOAuth {
  access_token: string
  scope: string
  token_type: string
}

export interface GitHubUser {
  avatar_url: string
  login: string
}

export interface GitHubIssue {
  number: number
  title: string
  created_at: string
  user: GitHubUser
  labels: {
    name: string
  }[]
  body: string
  reactions: {
    confused: number
    eyes: number
    heart: number
    rocket: number
  }
  comments: number
}

export interface GitHubComment {
  id: number
  body: string
  created_at: string
  user: GitHubUser
}
