import { CommentsServices, JobsService } from '@/services'
import { DEFAULT_CONFIG } from '@/services/services-props'

export function useServices () {
  return {
    comments: () => CommentsServices(DEFAULT_CONFIG),
    jobs: () => JobsService(DEFAULT_CONFIG)
  }
}
