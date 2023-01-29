import { ReadJob } from '@/domain/usecases'
import { GitHubRepository } from '@/infraestructure/repositories'

interface Params {
  group: string
}

interface Query {
  id?: string
}

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event) as Params
  const query = getQuery(event) as Query
  return await ReadJob(GitHubRepository)(params.group, 'vagas', query.id!)
})