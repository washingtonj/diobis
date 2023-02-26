<script lang="ts" setup>
const { params, query } = useRoute()

const { data, error } = await useFetch(`/api/jobs/${params.group}`, {
  key: 'jobs',
  query: { id: query.id }
})

useErrorHandling(error)

useHead({
  title: data?.value?.title,
  meta: [
    {
      name: 'description',
      content: data?.value?.title
    }
  ]
})
</script>

<template>
  <section v-if="data" class="flex flex-col">
    <div class="mb-4">
      <jobs-card-root class="w-full sticky top-12" unselectable :data="data!" />
    </div>
    <div class="rounded-md p-6 bg-blue-50 dark:bg-slate-800 overflow-auto">
      <app-markdown :content="data?.markdown || ''" />
    </div>
  </section>
</template>
