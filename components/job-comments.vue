<script lang="ts" setup>
import { ArrowDownIcon } from '@heroicons/vue/20/solid'
import { Props as AppCommentProps } from '@/components/app-comments.vue'

export type Props = {
  data: AppCommentProps['comments']
  isLoading: boolean
  isFirefox: boolean
}

defineProps<Props>()
defineEmits(['show'])

</script>

<template>
  <div
    class="bg-blue-50 dark:bg-slate-800 rounded-md overflow-hidden"
    :class="{ 'lg:h-full': $props.data.length && !$props.isFirefox, 'lg:h-[98%]': $props.data.length && $props.isFirefox, 'h-fit': !$props.data }"
  >
    <div class="flex items-center justify-between px-5 py-4 shadow-xl shadow-blue-100/40 dark:shadow-xl">
      <h2 class="text-sm font-bold dark:text-slate-600">
        Comentarios
      </h2>
      <span v-if="!$props.isLoading && !$props.data.length" class="cursor-pointer" @click="$emit('show')">
        <arrow-down-icon class="w-4" />
      </span>
      <span v-else-if="$props.isLoading">
        <app-spinner size="sm" />
      </span>
    </div>
    <div v-if="data.length" class="px-8 pt-5 pb-4 lg:pb-10 h-full overflow-auto" :class="{ 'shadow-xl': data }">
      <app-comments :comments="$props.data" />
    </div>
  </div>
</template>
