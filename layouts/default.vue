<script lang="ts" setup>
import { LAYOUT_PORTAL } from '@/consts/globals'
import { useUserStore } from '@/stores/user'

const User = useUserStore()

const userData = computed(() => {
  if (User.state.avatarUrl) {
    return {
      avatar_url: User.state.avatarUrl
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
  <layout-theme>
    <NuxtLoadingIndicator color="#2563eb" />
    <client-only>
      <layout-header
        :is-dark-mode="isDark"
        :current-route="$router.currentRoute.value.path"
        :navbar="navbar"
        :user="userData"
        @dark-mode="toggleDark"
        @page-change="$router.push"
      />
    </client-only>
    <main class="overflow-hidden">
      <div :id="LAYOUT_PORTAL" class="overflow-y-auto container mx-auto">
        <slot />
      </div>
    </main>
  </layout-theme>
  <client-only>
    <bt-sheet-authentication v-if="!User.state.isAuthenticated" @login="$router.push('/signin')" />
  </client-only>
</template>
