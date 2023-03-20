<script lang="ts" setup>
import { useUser } from '@/stores/user'
const { currentRoute, push } = useRouter()

const { state } = useUser()

const user = computed(() => {
  if (state.avatarUrl) {
    return {
      avatar_url: state.avatarUrl
    }
  }

  return undefined
})

const isDark = useDark()
const toggleDark = useToggle(isDark)

const navbar = [
  {
    id: 'home',
    title: 'Vagas',
    path: '/',
    matchPaths: ['/v/:group']
  },
  {
    id: 'about',
    title: 'Sobre',
    path: '/about'
  }
]

</script>

<template>
  <layout-header
    :is-dark-mode="isDark"
    :current-route="currentRoute.path"
    :navbar="navbar"
    :user="user"
    @dark-mode="toggleDark"
    @page-change="push"
  />
</template>
