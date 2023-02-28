<script lang="ts" setup>
import { ArrowDownIcon } from '@heroicons/vue/20/solid'

type Props = {
  id: string
  group: string
  repo: string
  authorId: string
}

const props = defineProps<Props>()

const isLoading = ref(false)

const { data, pending, execute } = await useFetch('/api/comments', {
  key: `ui/job-comments/${props.group}:${props.repo}:${props.id}`,
  params: { id: props.id, group: props.group, repo: props.repo },
  server: false,
  immediate: false,
  transform: data => data?.map(comment => ({
    isAuthor: props.authorId === comment.user.login_id,
    name: comment.user.login_id,
    avatar: comment.user.avatar_url,
    date: comment.created_at,
    comment: comment.body
  }))
})

function handleGetComments () {
  if (!pending.value) { return }

  isLoading.value = true
  execute()
}

watch(data, (oldValue, newValue) => {
  if (oldValue?.length !== newValue?.length) {
    isLoading.value = false
  }
})

</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-sm font-bold dark:text-slate-600">
      Comentarios
    </h2>
    <span v-if="!isLoading && pending" class="cursor-pointer" @click="handleGetComments">
      <arrow-down-icon class="w-4" />
    </span>
    <span v-else-if="isLoading">
      <app-spinner size="sm" />
    </span>
  </div>
  <div v-if="data" class="mt-4">
    <app-comments :comments="data!" />
  </div>
</template>
