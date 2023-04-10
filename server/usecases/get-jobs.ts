import { JobRepository } from '@/server/domain/interfaces'

const REMOVED_JOBS = ['ATENÇÃO: Leia nossas regras', 'ATENÇÃO: Leia nossas regras.']

export function GetJobs (JobEntity: JobRepository) {
  return async function () {
    const raw = await JobEntity.getAll()

    const filtered = raw
      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
      .filter(job => !REMOVED_JOBS.includes(job.title))

    return filtered
  }
}
