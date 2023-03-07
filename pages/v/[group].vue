<script lang="ts" setup>
import { useSettings } from '@/stores/settings'

const { params, query } = useRoute()

const { data, error } = await useFetch(`/api/jobs/${params.group}`, {
  params: { repo: query.repo, id: query.id }
})

const { state } = useSettings()

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
  <main
    v-if="data"
    class="h-full flex flex-col gap-4 p-4 lg:p-0 lg:py-4"
    :class="{ 'firefox': state.browser === 'firefox' }"
  >
    <section class="card">
      <jobs-card-root
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
    <section class="reactions h-fit flex justify-between px-4 py-3 rounded-md bg-blue-50 dark:bg-slate-800">
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
    <section class="content sticky top-0 overflow-auto;">
      <job-content :content="data.markdown" />
    </section>
    <section v-if="data.interactions?.comments" class="comment sticky top-0 rounded-md overflow-auto">
      <job-comments
        :id="data.id"
        :author-id="data.user.login_id"
        :group="data.repository.group"
        :repo="data.repository.repo"
      />
    </section>
  </main>
</template>

<style lang="css" scoped>
main {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

main::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width: theme('screens.lg')) {
  main {
    display: grid;
    overflow: scroll;
    height: calc(100vh - 3.5rem);

    grid-template-areas:
      "card content"
      "reactions content"
      "comment content"
    ;
    grid-template-columns: 450px auto;
    grid-template-rows: auto 40px max-content;
  }

  main.firefox .comment {
    height: calc(100vh - 4.5rem);
  }

  .card {
    height: fit-content;
    grid-area: card;
  }

  .content {
    height: calc(100vh - 5.5rem);
    grid-area: content;
  }

  .comment {
    height: calc(100vh - 5.5rem);
    grid-area: comment;
  }

  .reactions {
    grid-area: reactions;
  }
}
</style>
