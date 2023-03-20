import { H3Event } from 'h3'

type Header = {
  'x-github-token'?: string
}

export function getContextHeader (event: H3Event) {
  return getHeaders(event) as Header
}
