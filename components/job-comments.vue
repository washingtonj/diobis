<script lang="ts" setup>
import { ArrowDownIcon } from '@heroicons/vue/20/solid'
import { Props as AppCommentProps } from '@/components/app-comments.vue'

export type Props = {
  data: AppCommentProps['comments']
  isLoading: boolean
  isEmpty: boolean
  isFirefox: boolean
  isAuthenticated: boolean
}

export type Emits = {
  (e: 'show'): void
  (e: 'submit', comment: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const inputValue = ref('')

function submitComment () {
  emit('submit', inputValue.value)
  inputValue.value = ''
}
</script>

<template>
  <div
    class="bg-blue-50 dark:bg-slate-800 rounded-md overflow-hidden"
    :class="{ 'lg:h-full': props.data.length && !props.isFirefox, 'lg:h-[98%]': props.data.length && props.isFirefox, 'h-fit': !props.data }"
  >
    <div class="flex items-center justify-between px-5 py-4 shadow-xl shadow-blue-100/40 dark:shadow-xl">
      <h2 class="text-sm font-bold dark:text-slate-500">
        Comentarios
      </h2>
      <span
        v-if="!props.isEmpty && !props.isLoading && !(props.data.length > 0)"
        class="cursor-pointer"
        @click="$emit('show')"
      >
        <arrow-down-icon class="w-4" />
      </span>
      <span v-if="props.isLoading">
        <app-spinner size="sm" />
      </span>
    </div>

    <div v-if="data.length" class="h-full overflow-auto">
      <div class="p-5 lg:pb-10 ">
        <app-comments :comments="props.data" />
      </div>
    </div>

    <div v-if="props.isEmpty" class="p-8 w-full flex justify-center items-center">
      <p class="text-sm">
        Esta vaga não contem comentários.
      </p>
    </div>

    <div v-if="props.isAuthenticated && (props.isEmpty || props.data.length)" class="px-4 py-4 border-t border-slate-900/10 dark:border-slate-700">
      <div class="bg-blue-100 dark:bg-slate-700 rounded-lg">
        <textarea
          v-model="inputValue"
          placeholder="Deixe seu comentário, dúvida ou sugestão."
          class="w-full text-sm border-inherit p-4 bg-transparent outline-none resize-none dark:text-white text-black"
        />
        <div class="flex justify-end">
          <button
            :disabled="!inputValue"
            class="-mt-1.5 py-2 px-4 text-xs font-bold rounded-br-lg rounded-tl-lg bg-blue-600 text-white disabled:bg-slate-400 transition-colors"
            @click="submitComment"
          >
            Comentar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
