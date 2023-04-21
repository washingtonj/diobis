import { getContextHeader } from '@/server/utils'
import { getUser } from '@/server/usecases'
import { GitHubAPI, GitHubAuth } from '@/server/infrastructure/adapters'

export default defineEventHandler(async (event) => {
  const { Authorization: authorization } = getContextHeader(event)

  const GitHubService = GitHubAPI()

  return await getUser(GitHubAuth({ GitHubService }))(authorization!)
})
