<script lang="ts" setup>
import { marked } from 'marked'

type Props = {
  content: string;
};

const props = defineProps<Props>()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <article class="bg-transparent text-black border-transparent dark:text-white markdown-body" v-html="marked.parse(props.content)" />
</template>

<style lang="postcss">
html.dark * .markdown-body > * {
  border-color: theme('colors.slate.700') !important;
}

.markdown-body > * {
  border-color: theme('colors.slate.200') !important;
}
</style>
