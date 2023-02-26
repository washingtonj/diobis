import { GitHubRepo } from '@/domain/interfaces'

export function ListJobs (GitHubRepo: GitHubRepo) {
  return async function () {
    const data = await Promise.all([
      GitHubRepo.getAll('frontendbr', 'vagas'),
      GitHubRepo.getAll('backend-br', 'vagas')
    ])

    return data
      .flat()
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  }
}
