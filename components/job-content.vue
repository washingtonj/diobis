<script lang="ts" setup>
type Props = {
  content: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="h-full bg-blue-50 dark:bg-slate-800 rounded-md overflow-hidden">
    <div class="flex items-center justify-between px-5 py-4 shadow-xl shadow-blue-100/40 dark:shadow-xl">
      <h2 class="text-sm font-bold dark:text-slate-600">
        Descrição
      </h2>
    </div>
    <div class="h-full px-8 pt-5 pb-8 lg:pb-24 mb-4 overflow-auto">
      <app-markdown :content="props.content || ''" />
    </div>
  </div>
</template>
