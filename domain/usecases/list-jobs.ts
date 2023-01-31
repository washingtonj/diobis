import { GitHubRepo } from '@/domain/interfaces'

export function ListJobs(GitHubRepo: GitHubRepo) {
  return async function () {
    const data = await Promise.all([
      GitHubRepo.getAll('frontendbr', 'vagas'), 
      GitHubRepo.getAll('backend-br', 'vagas')
    ])

    const FourMonthsAgo = new Date()
    FourMonthsAgo.setMonth(FourMonthsAgo.getMonth() - 4)

    return data
      .flat() 
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .filter((job) => +new Date(job.createdAt) > +FourMonthsAgo)
  }
}

