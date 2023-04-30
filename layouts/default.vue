<script lang="ts" setup>
import { BriefcaseIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'
import { LAYOUT_PORTAL } from '@/consts/globals'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'

const User = useUserStore()
const Router = useRouter()
const Layout = useLayoutStore()

const showSidebar = ref(false)
const showAuthNotification = ref(true)
const headerEl = ref<HTMLHeadingElement>()

const headerMeasurements = useElementSize(headerEl)
const windowMeasurements = useWindowSize()

const sidebarHeight = computed(() => {
  return windowMeasurements.height.value - headerMeasurements.height.value
})

const navbar = [
  {
    id: 'home',
    title: 'Vagas',
    path: '/',
    icon: BriefcaseIcon,
    matchedPaths: ['/v/:id']
  },
  {
    id: 'about',
    title: 'Sobre',
    path: '/about',
    icon: InformationCircleIcon
  }
]

const selectedPage = computed(() => {
  const currentPath = Router.currentRoute.value.path
  const matchedPaths = Router.currentRoute.value.matched.map(m => m.path)

  const route = navbar.find((nav) => {
    return nav.matchedPaths?.some(path => matchedPaths.includes(path)) || nav.path === currentPath
  })

  return route?.id
})

const userData = computed(() => {
  if (User.state.avatarUrl) {
    return {
      avatar_url: User.state.avatarUrl
    }
  }

  return undefined
})

function handleAuthNotification () {
  showAuthNotification.value = false
}

</script>

<template>
  <NuxtLoadingIndicator color="#2563eb" />

  <layout-theme :color="Layout.bgColor">
    <client-only>
      <layout-header
        ref="headerEl"
        :is-dark-mode="Layout.isDark"
        :current-route="$router.currentRoute.value.path"
        :navbar="navbar"
        :user="userData"
        @dark-mode="Layout.toggleTheme"
        @page-change="$router.push"
        @go-home="$router.push('/')"
        @toggle-sidebar="showSidebar = true"
      />
    </client-only>

    <main :id="LAYOUT_PORTAL" class="overflow-hidden">
      <client-only>
        <layout-sidebar
          v-model:hidden="showSidebar"
          :navbar="navbar"
          :selected-page-id="selectedPage"
          :height="sidebarHeight"
          @page-change="$router.push"
        />
      </client-only>

      <div class="md:px-4 md:ml-16 2xl:container 2xl:mx-auto 2xl:p-0">
        <slot />
      </div>
    </main>

    <client-only>
      <Transition
        appear
        enter-to-class="animate__animated animate__slideInUp"
        leave-active-class="animate__animated animate__slideOutDown"
      >
        <bt-sheet-authentication
          v-if="!User.state.isAuthenticated && showAuthNotification"
          @login="$router.push('/signin')"
          @close="handleAuthNotification"
        />
      </Transition>
    </client-only>
  </layout-theme>
</template>
