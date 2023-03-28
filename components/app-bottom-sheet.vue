<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'

export type Props = {
  id?: string;
  title: string;
}

export type Emits = {
  (e: 'close'): void;
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    :id="$props.id"
    class="fixed z-50  w-full rounded-t-xl bottom-0 left-0 p-8 pt-4 backdrop-blur bg-blue-50/75 border-t-2 border-blue-600 dark:bg-slate-900/75 dark:text-white text-black"
  >
    <span class="flex items-center justify-between border-b-[1px] pb-2 mb-2">
      <h2 class="text-lg font-bold">
        {{ $props.title }}
      </h2>
      <button
        class="rounded-full hover:bg-blue-600/5 hover:dark:bg-slate-200/5 transition-colors delay-150 p-1.5"
        @click="$emit('close')"
      >
        <x-mark-icon class="w-5 h-5" />
      </button>
    </span>
    <slot />
  </div>
</template>
