<script setup lang="ts">
import { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

defineProps<Props>()
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col h-72 justify-center items-center">
      <span class="flex flex-col items-center mb-4">
        <h1 class="text-4xl font-bold mb-2">
          {{ error.statusCode }}
        </h1>
        <p class="text-gray-500">
          {{ error.message }}
        </p>
      </span>
      <NuxtLink href="/">
        Inicio
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
