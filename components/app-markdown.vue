<script lang="ts" setup>
import { marked } from 'marked'

type Props = {
  content: string;
};

const props = defineProps<Props>()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <article
    class="bg-transparent text-black dark:text-white markdown-body"
    v-html="marked.parse(props.content)"
  />
</template>
