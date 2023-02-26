import { GitHubRepo } from '@/domain/interfaces'
import { JobEntity } from '@/domain/entities'

export function ReadJob (GitHubRepo: GitHubRepo) {
  return function (group: string, repo: string, id: string) {
    function onSuccess (JobEntity: JobEntity) {
      return JobEntity
    }

    return GitHubRepo
      .getById(group, repo, id)
      .then(onSuccess)
  }
}
