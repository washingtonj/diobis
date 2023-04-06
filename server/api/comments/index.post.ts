import { commentJob } from '@/core/domain/usecases'
import { GitHubAPI } from '@/core/infraestructure/services'

type Body = {
  group: string
  repo: string
  id: string
  comment: string
}

export default defineEventHandler(async (event) => {
  const { group, repo, comment, id } = await readBody<Body>(event)
  const { Authorization } = getContextHeader(event)

  return await commentJob(GitHubAPI({ authorization: Authorization }))(group, repo, id, comment)
})
