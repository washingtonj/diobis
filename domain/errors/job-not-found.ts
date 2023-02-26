export class JobNotFoundError extends Error {
  public readonly group!: string
  public readonly repo!: string
  public readonly id!: string

  constructor (data: Omit<JobNotFoundError, keyof Error>) {
    super(`Job ${data.id} from ${data.group}/${data.repo} not found`)
    this.name = '404'
  }
}
