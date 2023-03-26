import { GITHUB_AUTHENTICATED_COOKIE_NAME, GITHUB_RENEWABLE_COOKIE_NAME } from '@/consts/globals'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return
  }

  if (to.path === '/signin') {
    return
  }

  const isAuthenticated = useCookie(GITHUB_AUTHENTICATED_COOKIE_NAME)
  const isRenewable = useCookie(GITHUB_RENEWABLE_COOKIE_NAME)

  if (!isAuthenticated.value && isRenewable.value) {
    return navigateTo('/signin?renew=true')
  }
})
