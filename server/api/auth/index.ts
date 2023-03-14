import { AuthenticateUser } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/repositories'

export type Query = {
  authCode: string
}

export default defineEventHandler(async (event) => {
  const { authCode } = getQuery(event) as Query
  return await AuthenticateUser(GitHubAPI)(authCode)
})
