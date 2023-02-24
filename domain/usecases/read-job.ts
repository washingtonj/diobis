import { GitHubRepo } from '@/domain/interfaces'

export function ReadJob (GitHubRepo: GitHubRepo) {
  return async function (group: string, repo: string, id: string) {
    // VERIFY IF THE GROUP IS AN AUTHORIZED GROUP
    // VERIFY IF THE REPO IS AN AUTHORIZED REPO

    const data = await GitHubRepo.getById(group, repo, id)

    if (!data) { throw new Error('Job not found') }

    return data
  }
}
