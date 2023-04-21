import { GetJobComments } from '@/server/usecases'
import { getContextHeader } from '@/server/utils'
import { JobRepository, UnstorageRedis, GitHubAPIFactory } from '@/server/infrastructure/adapters'

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
