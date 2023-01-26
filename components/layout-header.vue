<script lang="ts" setup>
import {
  MagnifyingGlassCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/vue/24/solid";

interface Props {
  isDarkMode: boolean;
  navbar: { id: string; title: string; path: string }[];
  currentPage: string;
}

const props = defineProps<Props>();

const emits = defineEmits(["pageChange", "darkMode"]);
</script>

<template>
  <header
    data-testid="LayoutTopbarRoot"
    class="sticky top-0 z-40 w-full backdrop-blur p-4 md:p-0 flex-none border-b border-inherit bg-inherit dark:bg-slate-900/75"
  >
    <div
      class="container md:min-h-[3.5rem] mx-auto flex items-center flex-col md:flex-row"
    >
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center">
          <MagnifyingGlassCircleIcon
            class="w-5 h-5 mr-2 fill-blue-600 text-white"
          />
          <layout-logo class="fill-black dark:fill-white" />
        </div>
        <nav class="flex flex-1 justify-start mt-[0.5px]">
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
          <div class="flex items-center mr-4">
            <button id="toggleDarkMode">
              <Component
                :is="props.isDarkMode ? SunIcon : MoonIcon"
                class="cursor-pointer w-5 h-5 text-slate-400 hover:text-slate-500 dark:fill-white"
                @click="() => emits('darkMode', !props.isDarkMode)"
              />
            </button>
          </div>
        </client-only>
      </div>
      <client-only>
        <div id="header-gadget" class="w-full md:w-fit"></div>
      </client-only>
    </div>
  </header>
</template>

<style lang="postcss">
#header-gadget > :first-child {
  @apply mt-4 md:mt-0 md:w-96;
}
</style>
