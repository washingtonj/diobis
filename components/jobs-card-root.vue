<script lang="ts" setup>
interface Props {
  unselectable?: boolean;
  data: {
    id: string;
    title: string;
    createdBy: string;
    createdAt: string;
    avatarUrl: string;
    tags: string[];
  };
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

function handleClick () {
  emit('click')
}
</script>

<template>
  <div
    data-testid="JobsCardRoot"
    class="w-full shadow-sm rounded-md p-4 border-2 border-transparent transition-colors duration-500 bg-blue-50 dark:bg-slate-800"
    :class="!props.unselectable && ' hover:border-blue-600 cursor-pointer'"
    @click="handleClick"
  >
    <div class="flex items-center justify-start">
      <img
        class="w-12 h-12 mr-4 rounded-full"
        :src="props.data.avatarUrl"
        alt="Avatar"
      >
      <div>
        <p class="font-bold text-sm">
          {{ props.data.createdBy }}
        </p>
        <p class="font-light text-xs">
          {{ useLocaleTimeAgo(new Date(data.createdAt)) }}
        </p>
      </div>
    </div>
    <div class="my-4">
      <h3 class="text-sm font-semibold">
        {{ props.data.title }}
      </h3>
    </div>
    <div
      v-if="!!props.data.tags.length"
      class="flex flex-wrap gap-1.5 border-t-2 pt-4 dark:border-slate-700/40"
    >
      <p
        v-for="tag in props.data.tags"
        :key="tag"
        class="text-xs p-1 px-2 rounded-md bg-blue-100 dark:bg-slate-900/75"
      >
        {{ tag }}
      </p>
    </div>
  </div>
</template>
