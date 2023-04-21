export class JobNotCached extends Error {
  public readonly group!: string
  public readonly repo!: string
  public readonly id!: string

  constructor (data: Omit<JobNotCached, keyof Error>) {
    super(`Job ${data.id} from ${data.group}/${data.repo} not cached`)
    Object.assign(this, data)
    this.name = '404'
  }
}
