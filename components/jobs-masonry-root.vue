<script setup lang="ts">
const containerRef = ref<HTMLUListElement>(null!)

const isUltra = useMediaQuery('(min-width: 1536px)')
const isWide = useMediaQuery('(min-width: 1024px)')
const isTablet = useMediaQuery('(min-width: 768px)')

const columns = computed(() => {
  if (isUltra.value) { return 4 }
  if (isWide.value) { return 3 }
  if (isTablet.value) { return 2 }
  return 1
})

const items = computed(() => {
  const slots = useSlots().default!()
  const cards = slots[0].children as any[]
  const skeleton = slots[1].children as any[]

  if (typeof skeleton !== 'string' && !cards.length) { return createMasonry(skeleton, columns.value).chuck() }

  return createMasonry(cards, columns.value).chuck()
})

</script>

<template>
  <div ref="containerRef" data-testid="JobsMasonryRoot" class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
    <div v-for="cols, index in items" :key="index" class="grid gap-3">
      <component :is="item" v-for="item in cols" :key="item" />
    </div>
  </div>
</template>
