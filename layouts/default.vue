<script lang="ts" setup>
import { LAYOUT_PORTAL } from '@/consts/globals'

const isDark = useDark()

const toggleDark = useToggle(isDark)

const theme = computed(() => (isDark.value ? '#0f172a' : '#ffffff'))

useHead({
  meta: [{ name: 'theme-color', content: theme }],
  bodyAttrs: {
    class: 'absolute top-0 z-20 w-full bg-white dark:bg-slate-900 overflow-y-scroll'
  }
})
</script>

<template>
  <div class="relative border-slate-900/10 dark:border-slate-700">
    <NuxtLoadingIndicator color="#2563eb" />
    <client-only>
      <layout-header :is-dark-mode="isDark" @dark-mode="toggleDark()" />
    </client-only>
    <main class="overflow-hidden text-black dark:text-white">
      <div :id="LAYOUT_PORTAL" class="overflow-y-auto container mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="css">
html.dark *::-webkit-scrollbar {
  background-color: theme('colors.slate.800');
  width: theme('height.[3.5]');
}

html.dark *::-webkit-scrollbar-track {
  background-color: theme('colors.slate.800');
}

html.dark *::-webkit-scrollbar-thumb {
  background-color: theme('colors.slate.700');
  border-radius: 16px;
  border: 4px solid theme('colors.slate.800');
}

html.dark *::-webkit-scrollbar-button {
  display: none;
}
</style>
