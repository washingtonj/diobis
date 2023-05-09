export type ServicesProps = {
  baseUrl: string
  authorization?: string
  repositories: Array<{ owner: string, repo: string }>
}

export const DEFAULT_CONFIG: ServicesProps = {
  baseUrl: 'https://api.github.com',
  repositories: process.env.NODE_ENV === 'production'
    ? [
        { owner: 'frontendbr', repo: 'vagas' },
        { owner: 'backend-br', repo: 'vagas' }
      ]
    : [{ owner: 'washingtonj', repo: 'diobis-dev' }]
}
