<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { LAYOUT_PORTAL } from '@/consts/globals'

const emit = defineEmits(["close"]);
const target = ref(null);

onClickOutside(target, () => emit("close", true));
</script>

<template>
  <Teleport :to="`#${LAYOUT_PORTAL}`">
    <div
      ref="target"
      class="fixed px-4 pt-1 w-full left-0 bottom-0 md:top-14 md:h-fit rounded-t-3xl md:rounded-t md:rounded-b-3xl md:border-b-[1px] border-t-[1px] border-slate-200 dark:border-slate-700 backdrop-blur bg-white/40 dark:bg-slate-900/75"
    >
      <div
        class="flex items-center justify-between p-4 border-b-slate-200 dark:border-b-slate-700 border-b-[1px]"
      >
        <h2 class="font-bold text-xl">Fontes de dados</h2>
        <XCircleIcon class="w-6 cursor-pointer" @click="$emit('close', true)" />
      </div>
      <div class="my-6">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
