<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/20/solid'

type Props = {
  interactions: {
    comments?: number;
  }
}

const interactionsIcons: Record<string, FunctionalComponent> = {
  comments: ChatBubbleBottomCenterIcon
}

const props = defineProps<Props>()

</script>

<template>
  <div v-if="props" class="flex not-last:mr-2.5">
    <span v-for="interaction in Object.keys(props.interactions)" :key="interaction" class="flex items-center ">
      <component :is="interactionsIcons[interaction]" class="fill-slate-300 dark:fill-slate-600/90 w-4 mr-1.5" />
      <p class="text-[11px] text-slate-400 dark:text-slate-400">{{ (props.interactions as Record<string, string>)[interaction] }}
      </p>
    </span>
  </div>
</template>
