import { GitHubOAuthDTO, GitHubUserDTO } from './user-dtos'
import { OAuthModel, UserModel } from './user-models'

export function toOAuthModel (response: GitHubOAuthDTO): OAuthModel {
  const toCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  return {
    access_token: `${toCapitalize(response.token_type)} ${response.access_token}`
  }
}

export function toUserModel (response: GitHubUserDTO): UserModel {
  return {
    avatar_url: response.avatar_url,
    login_id: response.login
  }
}
