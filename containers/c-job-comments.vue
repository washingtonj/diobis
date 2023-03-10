<script lang="ts" setup>
import { Query } from '@/server/api/comments'
import { useSettings } from '@/stores/settings'
import { type Props as JobCommentsProps } from '@/components/job-comments.vue'

type Props = { authorId: string, group: string, repo: string, id: string }

const props = defineProps<Props>()
const store = useSettings()

const isLoading = ref(false)
const isFirefox = computed(() => store.state.browser === 'firefox')

const { data, pending, execute } = await useFetch('/api/comments', {
  params: { id: props.id, group: props.group, repo: props.repo } as Query,
  server: false,
  immediate: false,
  transform: data => data?.map(comment => ({
    isAuthor: props.authorId === comment.user.login_id,
    name: comment.user.login_id,
    avatar: comment.user.avatar_url,
    date: comment.created_at,
    comment: comment.body
  } as JobCommentsProps['data'][0]))
})

function handleExecute () {
  isLoading.value = pending.value
  execute()
}

watch(data, (prev, next) => {
  if (prev === next) { return }
  isLoading.value = false
})

</script>

<template>
  <job-comments :data="data || []" :is-loading="isLoading" :is-firefox="isFirefox" @show="handleExecute" />
</template>
