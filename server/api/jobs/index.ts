import { GetJobs } from '@/server/usecases'
import { JobRepository, UnstorageRedis, GitHubAPIFactory } from '@/server/infrastructure/adapters'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  const Repository = JobRepository({
    GitHubService: GitHubAPIFactory({ authorization: Authorization }),
    CacheService: UnstorageRedis()
  })

  return await GetJobs(Repository)()
})
