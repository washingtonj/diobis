import { GitHubCommentDTO } from './comments-dtos'
import { toCommentModel } from './comments-transforms'
import { fromBufferedJobId } from './jobs-transforms'
import { ServicesProps } from '@/services/services-props'

export function CommentsServices (props: ServicesProps) {
  const { baseUrl } = props

  async function getComments (jobId: string) {
    const { id, owner, repo } = fromBufferedJobId(jobId)
    const path = `${baseUrl}/repos/${owner}/${repo}/issues/${id}/comments`
    const issueComments = await $fetch<GitHubCommentDTO[]>(path)
    return issueComments.map(toCommentModel)
  }

  return {
    getComments
  }
}
