export type ServicesProps = {
  baseUrl: string
  repositories: Array<{ owner: string, repo: string }>
}

export const DEFAULT_CONFIG: ServicesProps = {
  baseUrl: 'https://api.github.com',
  repositories: [
    { owner: 'frontendbr', repo: 'vagas' },
    { owner: 'backend-br', repo: 'vagas' }
  ]
}
