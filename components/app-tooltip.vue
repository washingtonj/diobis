<script lang="ts" setup>
import { initTooltips } from 'flowbite'

type Props = {
  label: string
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
}

defineProps<Props>()

onMounted(() => {
  initTooltips()
})

const randomId = 'tooltip-' + Math.random().toString(36).substring(2, 9)

</script>

<template>
  <component :is="$slots.default!()[0]" :data-tooltip-target="randomId" :data-tooltip-placement="$props.placement" data-tooltip-trigger="hover" />

  <div
    :id="randomId"
    role="tooltip"
    class="absolute z-10 invisible inline-block px-2.5 py-1.5 text-sm font-medium transition-opacity duration-300 rounded-lg shadow-sm opacity-0 tooltip border-[1px] dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 dark:text-white text-black"
  >
    {{ $props.label }}
    <div class="tooltip-arrow" data-popper-arrow />
  </div>
</template>
