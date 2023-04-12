import { commentJob } from '@/server/usecases'
import { JobRepository } from '@/server/infrastructure/repositories'
import { GitHubAPIFactory, UnstorageRedis } from '@/server/infrastructure/services'

type Params = {
  id: string
}

type Body = {
  comment: string
}

export default defineEventHandler(async (event) => {
  const { comment } = await readBody<Body>(event)
  const { id } = getRouterParams(event) as Params
  const { Authorization: authorization } = getContextHeader(event)

  if (!authorization) {
    sendError(event, {
      fatal: false,
      name: 'Unauthorized',
      message: 'Please provide a valid GitHub token.',
      statusCode: 401

    })
    return
  }

  const Repository = JobRepository({
    CacheService: UnstorageRedis(),
    GitHubService: GitHubAPIFactory({ authorization })
  })

  return await commentJob(Repository)(id, comment)
})
