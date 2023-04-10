import { ReadJobComments } from '@/server/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '~~/server/infrastructure/services'
import { getContextHeader } from '@/server/utils'

export type Query = {
  id: string
  group: string
  repo: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query
  const { Authorization } = getContextHeader(event)

  return await ReadJobComments(
    GitHubAPIFactory({ authorization: Authorization }),
    UnstorageRedis()
  )(query.group, query.repo, query.id)
})
