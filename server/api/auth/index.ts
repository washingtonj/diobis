import { AuthenticateUser } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'

export type Query = {
  authCode: string
}

export default defineEventHandler(async (event) => {
  const { authCode } = getQuery(event) as Query
  const headers = getContextHeader(event)

  return await AuthenticateUser(GitHubAPI({ authorization: headers['x-github-token'] }))(authCode)
})
