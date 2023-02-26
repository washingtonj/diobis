<script lang="ts" setup>
interface Props {
  readonly?: boolean;
  reactions: {
    looking?: number;
    rocket?: number;
    heart?: number;
  }
}

const reactionsUnicode: Record<string, string> = {
  looking: '👀',
  rocket: '🚀',
  heart: '❤️'
}

const props = defineProps<Props>()

</script>

<template>
  <div class="flex not-last:mr-2.5">
    <template v-for="reaction in Object.keys(props.reactions)" :key="reaction">
      <span v-if="!props.readonly || !!(props.reactions as any)[reaction]" class="flex items-center text-xs">
        {{ reactionsUnicode[reaction] }}
        <p class="ml-1.5">{{ (props.reactions as Record<string, string>)[reaction] }}</p>
      </span>
    </template>
  </div>
</template>
