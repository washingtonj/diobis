<script setup lang="ts">
const isUltra = useMediaQuery('(min-width: 1536px)')
const isWide = useMediaQuery('(min-width: 1024px)')
const isTablet = useMediaQuery('(min-width: 768px)')

const columns = computed(() => {
  if (isUltra.value) return 4
  if (isWide.value) return 3
  if (isTablet.value) return 2
  return 1
})

const items = computed(() => {
  const [card, skeleton] = useSlots().default!()
  const cols = columns.value
  const original = card.children as any[]
  const multed: any = []

  if (typeof skeleton.children !== 'string') {
    original.push(...(skeleton.children as any[]))
  }

  Array.from([...Array(cols).keys()]).forEach((_, col) => {
    for (let row = 0; row < original.length; row += cols) {
      const item = original[row + col]
      if (item !== undefined) multed.push(item)
    }
  })

  return multed
})
</script>

<template>
  <div
    data-testid="JobsMasonryRoot"
    class="masonry-grid gap-3 columns-1 md:columns-2 lg:columns-3 2xl:columns-4"
  >
    <component :is="item" v-for="item in items" :key="item.key"></component>
  </div>
</template>

<style lang="postcss">
.masonry-grid > * {
  @apply mb-3 inline-block;
}
</style>
