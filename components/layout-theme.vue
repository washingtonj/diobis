<script lang="ts" setup>
const isDark = useDark()
const theme = computed(() => (isDark.value ? '#0f172a' : '#ffffff'))

useHead({
  meta: [{ name: 'theme-color', content: theme }],
  bodyAttrs: {
    class: 'absolute top-0 z-20 w-full bg-white dark:bg-slate-900 overflow-y-scroll overflow-x-hidden'
  }
})
</script>

<template>
  <div class="relative text-black dark:text-white border-slate-900/10 dark:border-slate-700">
    <slot />
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
