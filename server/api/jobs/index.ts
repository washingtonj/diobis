import { ListJobs } from '@/domain/usecases'
import { GitHubAPI } from '@/infraestructure/repositories'
import { InMemoryCache } from '@/infraestructure/services'

export default defineEventHandler(async () => {
  return await ListJobs(GitHubAPI, InMemoryCache)()
})
