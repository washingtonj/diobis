<script setup lang="ts">
const { data, pending } = useFetch("/api/jobs", { server: false });
</script>

<template>
  <jobs-masonry-root>
    <jobs-card-root
      v-for="item in data"
      :key="`${item.group}:${item.number}`"
      :data="item"
      @click="$router.push(`/${item.group}?id=${item.number}`)"
    />
    <template v-if="pending">
      <jobs-card-skeleton v-for="item in [...Array(12).keys()]" :key="item" />
    </template>
  </jobs-masonry-root>
</template>
