
export const GITHUB_BASE_URL = 'https://api.github.com/repos'
export const GITHUB_PARAMS = { per_page: 100 }
export const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID
export const GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET
export const GITHUB_REPOS = [
  { group: 'backend-br', repo: 'vagas' },
  { group: 'frontendbr', repo: 'vagas' }
]
