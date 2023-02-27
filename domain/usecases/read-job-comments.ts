import { GitHubRepo } from '@/domain/interfaces'

export function ReadJobComments (GitHubRepo: GitHubRepo) {
  return async function (group: string, id: string) {
    const comments = await GitHubRepo.getComments(group, 'vagas', id)
    return comments.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
  }
}
