import { ServicesProps } from './services-props'
import { GitHubOAuthDTO, GitHubUserDTO } from './user-dtos'
import { toOAuthModel, toUserModel } from './user-transforms'

export function UserServices (props: ServicesProps) {
  const { baseUrl } = props

  async function login (authCode: string) {
    const bearerToken = await $fetch<GitHubOAuthDTO>('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: {
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code: authCode
      }
    })

    return toOAuthModel(bearerToken)
  }

  async function getUser (token: string) {
    const userInformations = await $fetch<GitHubUserDTO>(`${baseUrl}/user`, {
      headers: {
        Authorization: token
      }
    })

    return toUserModel(userInformations)
  }

  return {
    login,
    getUser
  }
}
