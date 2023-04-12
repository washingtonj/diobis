import { JobRepository } from '@/server/domain/interfaces'

export function GetJobComments (JobReposity: JobRepository) {
  return async function (id: string) {
    const comments = await JobReposity.getComments(id)

    const filtered = comments
      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))

    return filtered
  }
}
