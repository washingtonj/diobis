import { ReadJobComments } from '@/core/domain/usecases'
import { UnstorageRedis, GitHubAPI } from '@/core/infraestructure/services'
import { getContextHeader } from '@/server/utils'

export type Query = {
  id: string
  group: string
  repo: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query
  const headers = getContextHeader(event)

  return await ReadJobComments(
    GitHubAPI({ authorization: headers['x-github-token'] }),
    UnstorageRedis()
  )(query.group, query.repo, query.id)
})
