<script lang="ts" setup>
import { FunctionalComponent } from 'vue'
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/20/solid'

interface Props {
  unselectable?: boolean;
  data: {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    avatarUrl: string;
    interactions?: {
      comments?: number;
    }
    reactions?: {
      looking?: number;
      rocket?: number;
      heart?: number;
    }
    tags: string[];
  };
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const reactionsUnicode: Record<string, string> = {
  looking: '👀',
  rocket: '🚀',
  heart: '❤️'
}

const interactionsIcons: Record<string, FunctionalComponent> = {
  comments: ChatBubbleBottomCenterIcon
}

function handleClick () {
  emit('click')
}
</script>

<template>
  <div
    data-testid="JobsCardRoot"
    class="w-full shadow-sm rounded-md border-2 border-transparent transition-colors duration-500 bg-blue-50 dark:bg-slate-800"
    :class="!props.unselectable && ' hover:border-blue-600 cursor-pointer'"
    @click="handleClick"
  >
    <div class="p-4">
      <div class="flex items-center justify-start">
        <img class="w-12 h-12 mr-4 rounded-full" :src="props.data.avatarUrl" alt="Avatar">
        <div>
          <p class="font-bold text-sm">
            {{ props.data.createdBy }}
          </p>
          <p class="font-light text-xs">
            {{ useLocaleTimeAgo(new Date(data.createdAt)) }}
          </p>
        </div>
      </div>
      <div class="my-4">
        <h3 class="text-sm font-semibold">
          {{ props.data.title }}
        </h3>
      </div>
      <div v-if="!!props.data.tags.length" class="flex flex-wrap gap-1.5 border-t-2 pt-4 dark:border-slate-700/40">
        <p v-for="tag in props.data.tags" :key="tag" class="text-xs p-1 px-2 rounded-md bg-blue-100 dark:bg-slate-900/75">
          {{ tag }}
        </p>
      </div>
    </div>
    <div class="flex justify-between px-4 pb-3">
      <div v-if="props.data.reactions" class="flex not-last:mr-2.5">
        <template v-for="reaction in Object.keys(props.data.reactions)" :key="reaction">
          <span v-if="!!(props.data.reactions as any)[reaction]" class="flex items-center text-[10px]">
            {{ reactionsUnicode[reaction] }}
            <p class="ml-1.5">{{ (props.data.reactions as Record<string, string>)[reaction] }}</p>
          </span>
        </template>
      </div>
      <div v-if="props.data.interactions" class="flex not-last:mr-2.5">
        <span v-for="interaction in Object.keys(props.data.interactions)" :key="interaction" class="flex items-center ">
          <component :is="interactionsIcons[interaction]" class="fill-slate-300 dark:fill-slate-600/90 w-4 mr-1.5" />
          <p class="text-[10px] text-slate-400 dark:text-slate-400">{{ (props.data.interactions as Record<string, string>)[interaction] }}
          </p>
        </span>
      </div>
    </div>
  </div>
</template>
