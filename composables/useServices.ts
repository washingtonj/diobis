import { CommentsServices, JobsService } from '@/services'
import { DEFAULT_CONFIG } from '@/services/services-props'
import { GITHUB_COOKIE_NAME } from '@/consts/globals'

export function useServices () {
  const token = useCookie(GITHUB_COOKIE_NAME)

  const config = {
    ...DEFAULT_CONFIG,
    authorization: token.value || undefined
  }

  return {
    comments: () => CommentsServices(config),
    jobs: () => JobsService(config)
  }
}
