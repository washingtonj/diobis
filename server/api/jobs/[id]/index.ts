import { GetJob } from '@/server/usecases'
import { JobRepository, GitHubAPIFactory, UnstorageRedis } from '@/server/infrastructure/adapters'

type Params = {
  id: string
}

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event) as Params
  const { Authorization: authorization } = getContextHeader(event)

  const Repository = JobRepository({
    GitHubService: GitHubAPIFactory({ authorization }),
    CacheService: UnstorageRedis()
  })

  return await GetJob(Repository)(params.id)
})
