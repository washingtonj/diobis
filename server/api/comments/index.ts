import { ReadJobComments } from '@/domain/usecases'
import { GitHubRepository } from '@/infraestructure/repositories'

type Query = {
  id: string
  group: string
}

export default defineEventHandler(async (event) => {
  const params = getQuery(event) as Query
  return await ReadJobComments(GitHubRepository)(params.group, params.id)
})
