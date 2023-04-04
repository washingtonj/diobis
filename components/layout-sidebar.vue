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
    class="group fixed z-20 w-52 left-0 h-full backdrop-blur border-inherit border-r-[1px] md:block md:w-16 md:hover:w-52 delay-100 transition-all dark:border-slate-700 dark:bg-slate-900/75"
    :class="{ 'hidden': !$props.hidden }"
  >
    <ul class="py-4 px-3 not-last:mb-2">
      <li
        v-for="nav in $props.navbar"
        :key="nav.id"
        class="flex items-center justify-start py-2.5 px-1 rounded-lg dark:text-white hover:bg-blue-600/10 hover:dark:bg-slate-200/5 transition-colors delay-100 cursor-pointer"
        :class="{
          'bg-blue-600/10 dark:bg-slate-200/5 text-blue-600 dark:text-blue-600': $props.selectedPageId === nav.id
        }"
        @click="handleChangePage(nav.path)"
      >
        <a :id="nav.id" class="flex w-15 items-center text-xs px-2">
          <component :is="nav.icon" class="w-4 h-4" />
          <p
            class="md:opacity-0 md:group-hover:opacity-100 md:-ml-5 md:group-hover:ml-3 transition-all delay-100 ease-linear font-semibold uppercase ml-3"
          >
            {{ nav.title }}
          </p>
        </a>
      </li>
    </ul>
  </aside>
</template>
