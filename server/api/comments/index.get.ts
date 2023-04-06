import { ReadJobComments } from '@/core/domain/usecases'
import { UnstorageRedis, GitHubAPIFactory } from '@/core/infraestructure/services'
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
