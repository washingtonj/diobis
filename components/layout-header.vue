<script lang="ts" setup>
import {
  MagnifyingGlassCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/solid'

import { HEADER_GADGET_PORTAL } from '@/consts/globals'

interface Props {
  isDarkMode: boolean;
  navbar: { id: string; title: string; path: string }[];
  currentPage: string;
}

const props = defineProps<Props>()

const emits = defineEmits(['pageChange', 'darkMode'])
</script>

<template>
  <header
    data-testid="LayoutTopbarRoot"
    class="sticky top-0 z-40 w-full backdrop-blur p-4 md:p-0 flex-none border-b border-inherit bg-inherit dark:bg-slate-900/75"
  >
    <div
      class="container md:h-14 mx-auto flex items-center flex-col md:flex-row"
    >
      <div class="w-full grid grid-cols-6 gap-x-4 md:grid-cols-12">
        <nuxt-link
          class="flex col-span-2 col-start-1 items-center cursor-pointer"
          to="/"
        >
          <MagnifyingGlassCircleIcon
            class="w-5 h-5 mr-2 fill-blue-600 text-white"
          />
          <layout-logo class="fill-black dark:fill-white" />
        </nuxt-link>
        <nav class="flex col-start-3 col-span-3 justify-start mt-[0.5px]">
          <ul class="flex">
            <nuxt-link
              v-for="item in props.navbar"
              :key="item.id"
              :to="item.path"
              class="flex items-center odd:mx-8 font-bold uppercase text-xs cursor-pointer transition-colors"
              :class="
                item.id === props.currentPage
                  ? 'text-blue-600'
                  : 'text-black dark:text-white'
              "
              @click="() => emits('pageChange', item.id)"
            >
              <p>{{ item.title }}</p>
            </nuxt-link>
          </ul>
        </nav>
        <client-only>
          <div
            class="flex md:col-start-13 md:row-start-1 items-center justify-end"
          >
            <button id="toggleDarkMode">
              <Component
                :is="props.isDarkMode ? SunIcon : MoonIcon"
                class="cursor-pointer w-5 h-5 text-slate-400 hover:text-slate-500 dark:fill-white"
                @click="() => emits('darkMode', !props.isDarkMode)"
              />
            </button>
          </div>
          <div
            :id="HEADER_GADGET_PORTAL"
            class="gadget row-start-2 md:row-start-1 col-span-full md:col-start-9 md:col-end-13"
          />
        </client-only>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.gadget > :first-child {
  @apply mt-4 md:mt-0;
}
</style>
