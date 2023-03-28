<script lang="ts" setup>
import { FunctionalComponent } from 'vue'

type Props = {
  hidden?: boolean
  selectedPageId?: string
  navbar: Array<{
    id: string
    title: string
    path: string
    icon: FunctionalComponent
  }>
}

type Emits = {
  (event: 'pageChange', path: string): void
  (event: 'update:hidden', hidden: boolean): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()

const sidebar = ref<HTMLElement>()

function handleChangePage (path: string) {
  emits('pageChange', path)
  emits('update:hidden', false)
}

onClickOutside(sidebar, () => emits('update:hidden', false))

</script>

<template>
  <aside
    ref="sidebar"
    class="fixed z-20 md:block left-0 w-16 h-full backdrop-blur border-inherit border-r-[1px] dark:border-slate-700 dark:bg-slate-900/75 dark:text-white text-black"
    :class="{ 'hidden': !$props.hidden }"
  >
    <ul class="py-4 px-3 not-last:mb-2">
      <li
        v-for="nav in $props.navbar"
        :key="nav.id"
        class="flex items-center justify-center rounded-lg text-slate-400 dark:text-white hover:bg-blue-600/5 hover:dark:bg-slate-200/5 transition-colors py-2"
        :class="{
          'bg-blue-600/5 dark:bg-slate-200/5 text-blue-600 dark:text-blue-600': $props.selectedPageId === nav.id
        }"
      >
        <a :id="nav.id" class="flex items-center text-sm px-2 cursor-pointer" @click="handleChangePage(nav.path)">
          <component :is="nav.icon" class="text w-4 h-4" />
          <p class="hidden ml-4">
            {{ nav.title }}
          </p>
        </a>
      </li>
    </ul>
  </aside>
</template>
