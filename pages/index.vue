<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchText = ref((route.query.search as string) || '')

const { data, pending, error } = useFetch('/api/jobs', { server: false })

const filteredData = computed(() => {
  if (!searchText.value) { return data.value }

  return data?.value?.filter(
    item =>
      item.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      item.tags
        .map(item => item.toLocaleLowerCase())
        .includes(searchText.value.toLowerCase())
  )
})

onUpdated(() => {
  if (error.value) {
    showError(error.value.data)
  }
})

useErrorHandling(error)

watch(searchText, (search) => {
  if (search.length === 0) {
    router.push({ query: {} })
    return
  }
  router.push({ query: { search } })
})
</script>

<template>
  <client-only>
    <jobs-masonry-root>
      <jobs-card-root
        v-for="item in filteredData"
        :key="`${item.group}:${item.number}`"
        :data="{
          id: item.id,
          avatarUrl: item.avatarUrl,
          createdBy: item.createdBy,
          createdAt: item.createdAt,
          title: item.title,
          tags: item.tags,
          interactions: {
            comments: item.interactions?.comments
          },
          reactions: {
            looking: item.reactions?.eyes,
            heart: item.reactions?.heart,
            rocket: item.reactions?.rocket
          }
        }"
        @click="$router.push(`/${item.group}?id=${item.number}`)"
      />
      <template v-if="pending">
        <jobs-card-skeleton v-for="item in [...Array(12).keys()]" :key="item" />
      </template>
    </jobs-masonry-root>
  </client-only>
  <template v-if="!pending && !filteredData?.length">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="text-2xl font-bold text-gray-500">
        No jobs found for "{{ searchText }}"
      </div>
      <div class="text-gray-500">
        Try searching for something else
      </div>
    </div>
  </template>

  <gadget-search v-model="searchText" />
</template>
