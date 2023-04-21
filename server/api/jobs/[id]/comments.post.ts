import { CommentJob } from '@/server/usecases'
import { JobRepository, GitHubAPIFactory, UnstorageRedis } from '@/server/infrastructure/adapters'

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

  return await CommentJob(Repository)(id, comment)
})
