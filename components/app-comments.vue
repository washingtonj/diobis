<script lang="ts" setup>
import { TrashIcon } from '@heroicons/vue/24/solid'

export type Props = {
  comments: Array<{
    isAuthor: boolean
    rules: ['delete']
    name: string
    userId: string
    avatar: string
    date: string
    comment: string
  }>
}

const props = defineProps<Props>()

</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="">
    <div v-for="comment in props.comments" :key="comment.name" class="border-t dark:border-slate-700/40 py-6">
      <div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img :src="comment.avatar" class="rounded-full w-6 mr-2">
            <span class="flex items-center">
              <p class="text-sm font-bold">
                {{ comment.name }}
              </p>
              <p
                v-if="comment.isAuthor"
                class=" border-black dark:border-white border rounded-lg px-1.5 text-[10px] ml-2"
              >
                Autor
              </p>
            </span>
          </div>
          <p class="text-xs dark:text-slate-500">
            {{ useLocaleTimeAgo(new Date(comment.date)) }}
          </p>
        </div>
        <div class="py-1 mt-2 px-2.5 text-sm">
          <app-markdown :content="comment.comment" />
        </div>
        <div v-if="comment.rules.includes('delete')" class="flex justify-between">
          <div />
          <div class="mt-2.5 not-last:mr-1">
            <button
              class="group rounded-lg p-2 bg-blue-500/5 hover:bg-red-100 dark:bg-white/5 hover:dark:bg-red-800/20 transition-colors delay-150"
            >
              <TrashIcon
                class="w-2.5 h-2.5 text-slate-500 dark:text-slate-400 group-hover:text-red-600 group-hover:dark:text-red-600 transition-colors delay-150"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
