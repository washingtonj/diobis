export class InvalidGitHubOAuthCodeError extends Error {
  public readonly code!: string
  public readonly state!: string

  constructor (data: Omit<InvalidGitHubOAuthCodeError, keyof Error>) {
    super(`Invalid GitHub OAuth code ${data.code} for state ${data.state}`)
    this.name = '400'
  }
}
