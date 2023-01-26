import { ListJobs } from '@/domain/usecases'
import { GitHubRepository } from '@/infraestructure/repositories'

export default defineEventHandler(async (event) => {
  return await ListJobs(GitHubRepository)()
})