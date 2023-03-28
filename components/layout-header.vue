<script lang="ts" setup>
import {
  MagnifyingGlassCircleIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon
} from '@heroicons/vue/24/solid'

import { HEADER_GADGET_PORTAL } from '@/consts/globals'

type Props = {
  isDarkMode: boolean
  user?: {
    avatar_url: string
  }
}

type Emits = {
  (e: 'darkMode', isDarkMode: boolean): void
  (e: 'goHome'): void
  (e: 'toggleSidebar'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <header
    data-testid="LayoutTopbarRoot"
    class="sticky top-0 z-10 w-full backdrop-blur md:p-0 flex-none border-b border-inherit bg-inherit dark:bg-slate-900/75"
  >
    <div class="md:h-14 p-4 flex items-center flex-col md:flex-row">
      <div class="grid grid-cols-6 gap-x-4 w-full items-center justify-center md:flex">
        <button
          id="toggleSidebar"
          class="flex w-8 h-8 justify-center col-start-1 md:hidden rounded-full hover:bg-blue-600/5 hover:dark:bg-slate-200/5 transition-colors delay-150 p-1.5"
          @click="$emit('toggleSidebar')"
        >
          <bars-3-icon class="w-5 h-5 text-slate-400 dark:fill-white" />
        </button>
        <a id="logo" class="flex items-center  w-full col-start-2 col-span-4 cursor-pointer" @click="$emit('goHome')">
          <MagnifyingGlassCircleIcon class="w-5 h-5 mr-2 fill-blue-600 text-white" />
          <app-logo class="fill-black dark:fill-white" />
        </a>

        <div :id="HEADER_GADGET_PORTAL" class="gadget md:w-4/12 row-start-2 col-span-12" />

        <div class="flex flex-row-reverse items-center justify-end col-start-12 md:col-start-10">
          <button
            v-if="$props.user"
            id="userMenu"
            class="rounded-full hover:bg-blue-600/5 hover:dark:bg-slate-200/5 transition-colors delay-150 w-8 p-1 cursor-default ml-1"
          >
            <img :src="$props.user.avatar_url" class="rounded-full">
          </button>
          <button
            id="toggleDarkMode"
            class="rounded-full hover:bg-blue-600/5 hover:dark:bg-slate-200/5 transition-colors delay-150 p-1.5"
            @click="() => $emit('darkMode', !$props.isDarkMode)"
          >
            <Component :is="$props.isDarkMode ? SunIcon : MoonIcon" class="w-5 h-5 text-slate-400 dark:fill-white" />
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
