<script lang="ts" setup>
import {
  MagnifyingGlassCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/solid'

import { HEADER_GADGET_PORTAL } from '@/consts/globals'

interface Props {
  isDarkMode: boolean;
}

const { currentRoute } = useRouter()

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

const props = defineProps<Props>()

const emits = defineEmits(['darkMode'])
</script>

<template>
  <header
    data-testid="LayoutTopbarRoot"
    class="sticky top-0 z-40 w-full backdrop-blur p-4 md:p-0 flex-none border-b border-inherit bg-inherit dark:bg-slate-900/75"
  >
    <div class="container md:h-14 mx-auto flex items-center flex-col md:flex-row">
      <div class="w-full grid grid-cols-6 gap-x-4 md:flex">
        <nuxt-link class="flex col-span-2 col-start-1 items-center cursor-pointer" to="/">
          <MagnifyingGlassCircleIcon class="w-5 h-5 mr-2 fill-blue-600 text-white" />
          <layout-logo class="fill-black dark:fill-white" />
        </nuxt-link>
        <nav class="hidden col-start-3 col-span-3 justify-start md:flex-1 md:flex mt-[0.5px]">
          <ul class="flex">
            <nuxt-link
              v-for="item in navbar"
              :key="item.id"
              :to="item.path"
              class="flex items-center odd:mx-8 font-bold uppercase text-xs cursor-pointer transition-colors"
              :class="
                currentRoute.path === item.path || item.matchPaths?.includes(currentRoute.matched[0].path)
                  ? 'text-blue-600'
                  : 'text-black dark:text-white'
              "
            >
              <p>{{ item.title }}</p>
            </nuxt-link>
          </ul>
        </nav>
        <div
          :id="HEADER_GADGET_PORTAL"
          class="gadget md:w-3/12 row-start-2 col-span-12"
        />
        <div class="flex flex-row-reverse items-center justify-end col-start-12">
          <button id="toggleDarkMode">
            <Component
              :is="props.isDarkMode ? SunIcon : MoonIcon"
              class="cursor-pointer w-5 h-5 text-slate-400 hover:text-slate-500 dark:fill-white"
              @click="() => emits('darkMode', !props.isDarkMode)"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.gadget> :first-child {
  margin-top: theme('margin.4');
}

@media (min-width: theme('screens.md')) {
  .gadget> :first-child {
    margin-top: 0;
  }
}
</style>
