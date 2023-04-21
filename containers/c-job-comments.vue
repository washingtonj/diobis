<script lang="ts" setup>
import { type Props as JobCommentsProps } from '@/components/job-comments.vue'
import { useSettings } from '@/stores/settings'
import { useUserStore } from '@/stores/user'

type Props = {
  authorId: string,
  id: string,
  isEmpty: boolean
}

const props = defineProps<Props>()
const store = useSettings()
const user = useUserStore()

const isLoading = ref(false)
const submitting = ref(false)
const isFirefox = computed(() => store.state.browser === 'firefox')

const { data, pending, execute } = await useFetch(`/api/jobs/${props.id}/comments`, {
  server: false,
  immediate: false,
  transform: data => data?.map(comment => ({
    isAuthor: props.authorId === comment.user.login_id,
    name: comment.user.login_id,
    avatar: comment.user.avatar_url,
    date: comment.created_at,
    comment: comment.body
  } as JobCommentsProps['data'][0])) || []
})

function loadComments () {
  isLoading.value = pending.value
  execute()
}

function submitComment (comment: string) {
  submitting.value = true

  $fetch(`/api/jobs/${props.id}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      comment
    })
  })
    .then(() => {
      loadComments()
    })
    .finally(() => {
      submitting.value = false
    })
    .catch((error) => {
      window.alert(`Error: ${error}`)
    })
}

watch(data, (prev, next) => {
  if (prev === next) { return }
  isLoading.value = false
})

</script>

<template>
  <job-comments
    :data="data || []"
    :is-authenticated="user.state.isAuthenticated || false"
    :is-empty="props.isEmpty"
    :is-loading="isLoading"
    :is-firefox="isFirefox"
    :is-submitting="submitting"
    @show="loadComments"
    @submit="submitComment"
  />
</template>
