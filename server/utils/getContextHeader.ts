import { H3Event } from 'h3'
import { GITHUB_COOKIE_NAME } from '@/consts/globals'

export function getContextHeader (event: H3Event) {
  const token = getCookie(event, GITHUB_COOKIE_NAME)

  return {
    Authorization: token
  }
}
