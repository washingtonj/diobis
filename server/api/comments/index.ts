import { ReadJobComments } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/repositories'
import { InMemoryCache } from '@/core/infraestructure/services'

type Query = {
  id: string
  group: string
  repo: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query
  return await ReadJobComments(GitHubAPI, InMemoryCache)(query.group, query.repo, query.id)
})
