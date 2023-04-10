import { CacheService } from '@/server/domain/interfaces'
import { JobEntity } from '@/server/domain/entities'
import { JobNotCached } from '@/server/domain/errors'
import { JOB_META_KEY } from '@/server/domain/consts/metas'

export function ReadJob (CacheService: CacheService) {
  return async function (group: string, repo: string, id: string) {
    const cachedJobs = await CacheService.get<JobEntity[]>(JOB_META_KEY)
    let job: JobEntity | undefined

    if (cachedJobs) {
      job = cachedJobs
        .filter(job => job.repository.group === group)
        .filter(job => job.repository.repo === repo)
        .find(job => job.id === id)
    }

    if (job) { return job }

    throw new JobNotCached({ group, id, repo })
  }
}
