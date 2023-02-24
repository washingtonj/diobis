import { ListJobs } from '@/domain/usecases'
import { GitHubRepository } from '@/infraestructure/repositories'

export default defineEventHandler(async () => {
  return await ListJobs(GitHubRepository)()
})
