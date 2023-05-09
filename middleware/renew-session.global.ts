import { GITHUB_COOKIE_NAME } from '@/consts/globals'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    return
  }

  const localStorage = JSON.parse(window.localStorage.getItem('userStore') || '')
  const authToken = useCookie(GITHUB_COOKIE_NAME)

  if (to.path === '/signin') {
    return
  }

  if (localStorage.isAuthenticated && !authToken.value) {
    return navigateTo('/signin?renew=true')
  }
})
