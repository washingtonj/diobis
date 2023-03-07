<script lang="ts" setup>
import { ArrowDownIcon } from '@heroicons/vue/20/solid'
import { useSettings } from '@/stores/settings'

type Props = {
  id: string
  group: string
  repo: string
  authorId: string
}

const props = defineProps<Props>()

const isLoading = ref(false)

const { data, pending, execute } = await useFetch('/api/comments', {
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

const { state } = useSettings()

const isFirefox = computed(() => state.browser === 'firefox')

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
  <div
    class="bg-blue-50 dark:bg-slate-800 rounded-md overflow-hidden"
    :class="{ 'lg:h-full': data && !isFirefox, 'lg:h-[98%]': data && isFirefox, 'h-fit': !data }"
  >
    <div class="flex items-center justify-between px-5 py-4 shadow-xl shadow-blue-100/40 dark:shadow-xl">
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
    <div v-if="data" class="px-8 pt-5 pb-4 lg:pb-10 mb-4 h-full overflow-auto" :class="{ 'shadow-xl': data }">
      <app-comments :comments="data!" />
    </div>
  </div>
</template>
