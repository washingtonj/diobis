<script lang="ts" setup>
import { LAYOUT_PORTAL } from "@/consts/globals";

const isDark = useDark();

const toggleDark = useToggle(isDark);

const theme = computed(() => (isDark.value ? "#0f172a" : "#ffffff"));

useHead({
  meta: [{ name: "theme-color", content: theme }],
  bodyAttrs: {
    class: "absolute top-0 z-20 w-full bg-white dark:bg-slate-900 overflow-y-scroll",
  },
});
</script>

<template>
  <div class="relative border-slate-900/10 dark:border-slate-700">
    <NuxtLoadingIndicator color="#2563eb" />
    <layout-header
      :is-dark-mode="isDark"
      :current-page="''"
      :navbar="[]"
      @dark-mode="toggleDark()"
    />
    <main class="overflow-hidden text-black dark:text-white">
      <div :id="LAYOUT_PORTAL" class="overflow-y-auto container mx-auto p-4">
        <slot />
      </div>
    </main>
  </div>
</template>
