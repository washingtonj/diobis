import { GetJobComments } from '@/server/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '@/server/infrastructure/services'
import { getContextHeader } from '@/server/utils'
import { JobRepository } from '@/server/infrastructure/repositories'

export type Params = { id: string }

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event) as Params
  const { Authorization: authorization } = getContextHeader(event)

  const Repository = JobRepository({
    CacheService: UnstorageRedis(),
    GitHubService: GitHubAPIFactory({ authorization })
  })

  return await GetJobComments(Repository)(params.id)
})
