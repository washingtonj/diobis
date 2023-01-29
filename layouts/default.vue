<script lang="ts" setup>
const isDark = useDark();

const toggleDark = useToggle(isDark);

const theme = computed(() => (isDark.value ? "#0f172a" : "#ffffff"));

const navbar = [
  {
    id: "Jobs",
    title: "Vagas",
    path: "/",
  },
];

const currentPageId = ref<string>(navbar[0].id);

useHead({
  meta: [{ name: "theme-color", content: theme }],
  bodyAttrs: {
    class:
      "absolute top-0 z-20 w-full transition-colors bg-white dark:bg-slate-900",
  },
});
</script>

<template>
  <div class="relative border-slate-900/10 dark:border-slate-700">
    <NuxtLoadingIndicator color="#2563eb" />
    <layout-header
      :is-dark-mode="isDark"
      :current-page="currentPageId"
      :navbar="navbar"
      @dark-mode="toggleDark()"
    />
    <main class="overflow-hidden text-black dark:text-white">
      <div id="layout-main" class="overflow-y-auto container mx-auto p-4">
        <slot />
      </div>
    </main>
  </div>
</template>
