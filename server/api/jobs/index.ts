import { GetJobs } from '@/server/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '~~/server/infrastructure/services'
import { JobRepository } from '~~/server/infrastructure/repositories'
import { getContextHeader } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const { Authorization } = getContextHeader(event)

  const Repository = JobRepository({
    GitHubService: GitHubAPIFactory({ authorization: Authorization }),
    CacheService: UnstorageRedis()
  })

  return await GetJobs(Repository)()
})
