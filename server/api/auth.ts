import { GITHUB_COOKIE_NAME } from '@/consts/globals'
import { UserServices } from '@/services'
import { DEFAULT_CONFIG } from '@/services/services-props'

export type Query = {
  authCode: string
}

export default defineEventHandler(async (event) => {
  const { authCode } = getQuery(event) as Query

  const bearerToken = await UserServices(DEFAULT_CONFIG).login(authCode)
  const userInformations = await UserServices(DEFAULT_CONFIG).getUser(bearerToken.access_token)

  const oneDayInMs = 1000 * 60 * 60 * 24 * 1

  setCookie(event, GITHUB_COOKIE_NAME, bearerToken.access_token, {
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDayInMs)
  })

  return {
    user_token: bearerToken.access_token,
    user_id: userInformations.login_id,
    avatar_url: userInformations.avatar_url
  }
})
