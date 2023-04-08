import { ListJobs } from '@/core/domain/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  return await ListJobs(GitHubAPIFactory({
    authorization: Authorization
  }), UnstorageRedis())()
})
