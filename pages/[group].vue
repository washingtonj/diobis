<script lang="ts" setup>
const { params, query } = useRoute()

const { data, error } = await useFetch(`/api/jobs/${params.group}`, {
  key: 'jobs',
  params: { repo: query.repo, id: query.id }
})

useErrorHandling(error)

useHead({
  title: data.value?.title,
  meta: [
    {
      name: 'description',
      content: data.value?.title
    }
  ]
})
</script>

<template>
  <main v-if="data">
    <section class="card">
      <jobs-card-root
        class="w-full sticky top-12"
        unselectable
        :data="{
          id: data.id,
          title: data.title,
          avatarUrl: data.user.avatar_url,
          createdBy: data.user.login_id,
          createdAt: data.created_at,
          tags: data.tags,
        }"
      />
    </section>
    <section class="reactions">
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
    </section>
    <section class="content">
      <app-markdown :content="data.markdown || ''" />
    </section>
    <section v-if="data.interactions?.comments" class="comment">
      <job-comments
        :id="data.id"
        :author-id="data.user.login_id"
        :group="data.repository.group"
        :repo="data.repository.repo"
      />
    </section>
  </main>
</template>

<style lang="postcss" scoped>
main {
  @apply flex flex-col gap-4;

  .card {
    @apply h-fit;
    grid-area: card;
  }

  .content {
    @apply h-fit rounded-md p-6 bg-blue-50 dark:bg-slate-800 overflow-auto  ;
    grid-area: content;
  }

  .comment {
    @apply h-fit px-5 py-4 bg-blue-50 dark:bg-slate-800 rounded-md;
    grid-area: comment;
  }

  .reactions {
    @apply h-fit flex justify-between px-4 py-3 bg-blue-50 dark:bg-slate-800 rounded-md;
    grid-area: reactions;
  }

  @screen lg {
    @apply grid;

    grid-template-areas:
      "card content"
      "reactions content"
      "comment content"
    ;
    grid-template-columns: 450px auto;
    grid-template-rows: auto 40px max-content;
  }
}
</style>
