export interface GitHubOAuthDTO {
  access_token: string
  scope: string
  token_type: string
}

export interface GitHubUserDTO {
  avatar_url: string
  login: string
}
