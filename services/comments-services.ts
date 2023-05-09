import { GitHubCommentDTO } from './comments-dtos'
import { toCommentModel } from './comments-transforms'
import { fromBufferedJobId } from './jobs-transforms'
import { ServicesProps } from '@/services/services-props'

export function CommentsServices (props: ServicesProps) {
  const { baseUrl, authorization } = props

  const headers = {
    Authorization: authorization || '',
    Accept: 'application/vnd.github.v3+json'
  }

  async function getComments (jobId: string) {
    const { id, owner, repo } = fromBufferedJobId(jobId)
    const path = `${baseUrl}/repos/${owner}/${repo}/issues/${id}/comments`
    const issueComments = await $fetch<GitHubCommentDTO[]>(path, { headers })
    return issueComments.map(toCommentModel)
  }

  async function postComment (jobId: string, comment: string) {
    const { id, owner, repo } = fromBufferedJobId(jobId)
    const path = `${baseUrl}/repos/${owner}/${repo}/issues/${id}/comments`
    const body = { body: comment }
    const issueComment = await $fetch<GitHubCommentDTO>(path, {
      method: 'POST',
      headers,
      body
    })

    return toCommentModel(issueComment)
  }

  return {
    getComments,
    postComment
  }
}
