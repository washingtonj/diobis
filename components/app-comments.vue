<script lang="ts" setup>
export type Props = {
  comments: Array<{
    isAuthor: boolean
    name: string
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
      </div>
    </div>
  </div>
</template>
