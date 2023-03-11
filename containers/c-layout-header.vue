<script lang="ts" setup>
const { currentRoute, push } = useRouter()

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
    @dark-mode="toggleDark"
    @page-change="push"
  />
</template>
