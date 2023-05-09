import { ServicesProps } from './services-props'
import { GitHubResponseDTO } from './jobs-dtos'
import { JobModel } from './jobs-models'
import { toJobModel, fromBufferedJobId, toBufferedJobId } from './jobs-transforms'

export function JobsService (props: ServicesProps) {
  const { baseUrl, repositories, authorization } = props

  const headers = {
    Authorization: authorization || '',
    Accept: 'application/vnd.github.v3+json'
  }

  async function getAllJobs () {
    const jobs: JobModel[] = []

    for await (const repo of repositories) {
      const path = `${baseUrl}/repos/${repo.owner}/${repo.repo}/issues`
      const issues = await $fetch<GitHubResponseDTO[]>(path, { headers })

      const transformed: JobModel[] = issues.map((issue) => {
        const job = toJobModel(issue)
        const id = toBufferedJobId(issue.number, repo)
        return { ...job, id }
      })

      jobs.push(...transformed)
    }

    return jobs
  }

  async function getById (jobId: string): Promise<JobModel> {
    const { id, owner, repo } = fromBufferedJobId(jobId)
    const path = `${baseUrl}/repos/${owner}/${repo}/issues/${id}`
    const issue = await $fetch<GitHubResponseDTO>(path, { headers })
    return { ...toJobModel(issue), id: jobId }
  }

  return {
    getAllJobs,
    getById
  }
}
