<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const searchText = ref((route.query.search as string) || '')

const { data, pending, error } = useFetch('/api/jobs', {
  server: false
})

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
    <main class="py-4 px-4 lg:px-0">
      <jobs-masonry-root>
        <jobs-card-root
          v-for="item in filteredData"
          :key="`${item.repository.group}/${item.repository.repo}/${item.id}`"
          :data="{
            id: item.id,
            avatarUrl: item.user.avatar_url,
            createdBy: item.user.login_id,
            createdAt: item.created_at,
            title: item.title,
            tags: item.tags
          }"
          @click="$router.push(`/v/${item.id}`)"
        >
          <template #interactions>
            <app-interactions
              :interactions="{
                comments: item.interactions?.comments,
              }"
            />
          </template>
          <template #reactions>
            <app-reactions
              :reactions="{
                heart: item.reactions?.heart,
                rocket: item.reactions?.rocket,
                looking: item.reactions?.eyes
              }"
              readonly
            />
          </template>
        </jobs-card-root>
        <template v-if="pending">
          <jobs-card-skeleton v-for="item in [...Array(12).keys()]" :key="item" />
        </template>
      </jobs-masonry-root>
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
    </main>
  </client-only>
</template>
