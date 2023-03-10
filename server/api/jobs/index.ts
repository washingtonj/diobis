import { ListJobs } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/repositories'
import { InMemoryCache } from '@/core/infraestructure/services'

export default defineEventHandler(async () => {
  return await ListJobs(GitHubAPI, InMemoryCache)()
})
