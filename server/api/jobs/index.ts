import { GetJobs } from '@/core/domain/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '@/core/infraestructure/services'
import { JobRepository } from '@/core/infraestructure/repositories'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  const Repository = JobRepository({
    GitHubService: GitHubAPIFactory({ authorization: Authorization }),
    CacheService: UnstorageRedis()
  })

  return await GetJobs(Repository)()
})
