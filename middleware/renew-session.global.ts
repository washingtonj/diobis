import { GITHUB_AUTHENTICATED_COOKIE_NAME, GITHUB_RENEWABLE_COOKIE_NAME } from '@/consts/globals'

export default defineNuxtRouteMiddleware(() => {
  if (process.server) {
    return
  }

  const isAuthenticated = useCookie(GITHUB_AUTHENTICATED_COOKIE_NAME)
  const isRenewable = useCookie(GITHUB_RENEWABLE_COOKIE_NAME)

  if (!isAuthenticated && isRenewable) {
    navigateTo('/signin?renew=true')
  }
})
