import { getContextHeader } from '@/server/utils'
import { getUser } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/services'

export default defineEventHandler(async (event) => {
  const headers = getContextHeader(event)

  return await getUser(GitHubAPI())(headers['x-github-token']!)
})
