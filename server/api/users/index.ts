import { getContextHeader } from '@/server/utils'
import { getUser } from '@/server/usecases'
import { GitHubAPI } from '~~/server/infrastructure/services'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  return await getUser(GitHubAPI())(Authorization!)
})
