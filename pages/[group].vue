<script lang="ts" setup>
import { ArrowDownIcon } from '@heroicons/vue/20/solid'
import { CommentEntity } from '@/domain/entities'

const { params, query } = useRoute()

const job = await useFetch(`/api/jobs/${params.group}`, {
  key: 'jobs',
  params: { repo: query.repo, id: query.id }
})

const comments = await useFetch('/api/comments', {
  key: 'comments',
  params: { id: query.id, group: params.group, repo: query.repo },
  server: false,
  transform: data => data?.map((comment: CommentEntity) => ({
    isAuthor: job.data.value?.user.login_id === comment.user.login_id,
    name: comment.user.login_id,
    avatar: comment.user.avatar_url,
    date: comment.created_at,
    comment: comment.body
  }))
})

useErrorHandling(job.error)

useHead({
  title: job.data.value?.title,
  meta: [
    {
      name: 'description',
      content: job.data.value?.title
    }
  ]
})
</script>

<template>
  <main v-if="job.data.value">
    <section class="card">
      <jobs-card-root
        class="w-full sticky top-12"
        unselectable
        :data="{
          id: job.data.value.id,
          title: job.data.value.title,
          avatarUrl: job.data.value.user.avatar_url,
          createdBy: job.data.value.user.login_id,
          createdAt: job.data.value.created_at,
          tags: job.data.value.tags,
        }"
      />
    </section>
    <section class="reactions">
      <app-reactions
        :reactions="{
          heart: job.data.value.reactions?.heart,
          rocket: job.data.value.reactions?.rocket,
          looking: job.data.value.reactions?.eyes
        }"
      />
      <app-interactions
        :interactions="{
          comments: job.data.value.interactions?.comments,
        }"
      />
    </section>
    <section class="content">
      <app-markdown :content="job.data.value.markdown || ''" />
    </section>
    <section v-if="comments.data.value?.length" class="comment">
      <div class="flex justify-between">
        <h2 class="text-sm font-bold dark:text-slate-600">
          Comentarios
        </h2>
        <arrow-down-icon class="w-4" />
      </div>
      <div class="mt-4">
        <app-comments :comments="comments.data.value" />
      </div>
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
