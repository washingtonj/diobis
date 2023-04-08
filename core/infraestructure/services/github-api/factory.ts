import { GitHubAPI } from './services'

type GitHubAPIFactoryProps = {
  authorization?: string
}

export function GitHubAPIFactory (props: GitHubAPIFactoryProps) {
  if (process.env.NODE_ENV === 'production') {
    return GitHubAPI({ authorization: props.authorization })
  }

  return GitHubAPI({ authorization: props.authorization, repositories: [{ group: 'washingtonj', repo: 'diobis-dev' }] })
}
