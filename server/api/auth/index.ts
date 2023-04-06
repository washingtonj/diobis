import { AuthenticateUser } from '@/core/domain/usecases'
import { GitHubAPIFactory } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'
import {
  GITHUB_COOKIE_NAME,
  GITHUB_AUTHENTICATED_COOKIE_NAME,
  GITHUB_RENEWABLE_COOKIE_NAME
} from '@/consts/globals'

export type Query = {
  authCode: string
}

export default defineEventHandler(async (event) => {
  const { authCode } = getQuery(event) as Query
  const { Authorization } = getContextHeader(event)

  const fourHoursInMs = 1000 * 60 * 60 * 4
  const expires = new Date(Date.now() + fourHoursInMs)

  const data = await AuthenticateUser(GitHubAPIFactory({ authorization: Authorization }))(authCode)
  const capitalizedType = data.auth.type.charAt(0).toUpperCase() + data.auth.type.slice(1)

  const isProductionEnvironment = process.env.NODE_ENV === 'production'

  setCookie(event, GITHUB_COOKIE_NAME, `${capitalizedType} ${data.auth.token}`, {
    httpOnly: isProductionEnvironment,
    secure: isProductionEnvironment,
    expires
  })

  setCookie(event, GITHUB_AUTHENTICATED_COOKIE_NAME, 'true', {
    expires
  })

  setCookie(event, GITHUB_RENEWABLE_COOKIE_NAME, 'true')

  return {
    user: data.user
  }
})
