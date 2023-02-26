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
  <section v-if="data" class="flex flex-col not-last:mb-4">
    <div>
      <jobs-card-root class="w-full sticky top-12" unselectable :data="data!" />
    </div>
    <div class="flex justify-between px-4 py-3 bg-blue-50 dark:bg-slate-800 rounded-md">
      <app-reactions
        :reactions="{
          heart: data.reactions?.heart,
          rocket: data.reactions?.rocket,
          looking: data.reactions?.eyes
        }"
      />
      <app-interactions
        :interactions="{
          comments: data.interactions?.comments,
        }"
      />
    </div>
    <div class="rounded-md p-6 bg-blue-50 dark:bg-slate-800 overflow-auto">
      <app-markdown :content="data?.markdown || ''" />
    </div>
  </section>
</template>
