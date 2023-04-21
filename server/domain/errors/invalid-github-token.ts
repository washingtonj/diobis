export class InvalidGitHubToken extends Error {
  public readonly code!: string

  constructor (data: Omit<InvalidGitHubToken, keyof Error>) {
    super(`Invalid GitHub Authentication token ${data.code}`)
    this.name = '401'
  }
}
