import { ReadJob } from '@/server/usecases'
import { UnstorageRedis } from '~~/server/infrastructure/services'

type Params = {
  group: string
}

type Query = {
  id: string
  repo: string
}

export default defineEventHandler(async (event) => {
  const routeParams = getRouterParams(event) as Params
  const query = getQuery(event) as Query
  return await ReadJob(UnstorageRedis())(routeParams.group, query.repo, query.id)
})
