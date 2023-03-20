import { ListJobs } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/repositories'
import { InMemoryCache } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const headers = getContextHeader(event)

  return await ListJobs(GitHubAPI({
    authorization: headers['x-github-token']
  }), InMemoryCache)()
})
