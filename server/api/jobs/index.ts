import { ListJobs } from '@/core/domain/usecases'
import { UnstorageRedis, GitHubAPI } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  return await ListJobs(GitHubAPI({
    authorization: Authorization
  }), UnstorageRedis())()
})
