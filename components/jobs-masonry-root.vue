<script setup lang="ts">
const containerRef = ref<HTMLUListElement>(null!);

const isUltra = useMediaQuery("(min-width: 1536px)");
const isWide = useMediaQuery("(min-width: 1024px)");
const isTablet = useMediaQuery("(min-width: 768px)");

const columns = computed(() => {
  if (isUltra.value) return 4;
  if (isWide.value) return 3;
  if (isTablet.value) return 2;
  return 1;
});

const items = computed(() => {
  const slots = useSlots().default!();
  let cards = slots[0].children as any[];
  const skeleton = slots[1].children as any[];

  if (typeof skeleton !== "string" && !cards.length) return skeleton;

  if (cards.length > 32 && cards.length % columns.value !== 0) {
    cards = cards.slice(0, cards.length - (cards.length % columns.value));
  }

  return order(cards, columns.value);
});

function order(original: any[], columns: number) {
  const ordered: any[] = [];

  Array.from([...Array(columns).keys()]).forEach((_, col) => {
    for (let row = 0; row < original.length; row += columns) {
      const item = original[row + col];
      if (item) ordered.push(item);
    }
  });

  return ordered;
}

// TODO: Implement virtual list
// const defaultHeight = ref(0);
// const currentVirtualList = ref(1);
//
// onMounted(() => {
//   document.addEventListener("scroll", (event) => {
//     const breakpoint = Math.round(
//       (containerRef.value.clientHeight /
//         (items.value.length / itemsPerVirtualList.value)) *
//         0.5
//     );

//     const matchHeight = currentVirtualList.value * breakpoint;

//     const { documentElement } = event.target as Document;

//     if (documentElement.scrollTop >= matchHeight) {
//       currentVirtualList.value += 1;
//     }

//     if (documentElement.scrollTop <= matchHeight - breakpoint) {
//       if (currentVirtualList.value === 1) return;
//       currentVirtualList.value -= 1;
//     }

//     console.log(currentVirtualList.value);
//   });
// });
</script>

<template>
  <ul
    ref="containerRef"
    data-testid="JobsMasonryRoot"
    class="masonry-grid gap-3 columns-1 md:columns-2 lg:columns-3 2xl:columns-4"
  >
    <component :is="item" v-for="item in items" :key="item.key" />
  </ul>
</template>

<style lang="postcss">
.masonry-grid > * {
  @apply mb-3 inline-block;
}
</style>
