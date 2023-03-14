<script lang="ts" setup>
import { LAYOUT_PORTAL } from '@/consts/globals'
import { useUser } from '@/stores/user'

const User = useUser()

</script>

<template>
  <layout-theme>
    <NuxtLoadingIndicator color="#2563eb" />
    <client-only>
      <c-layout-header />
    </client-only>
    <main class="overflow-hidden">
      <div :id="LAYOUT_PORTAL" class="overflow-y-auto container mx-auto">
        <slot />
      </div>
    </main>
  </layout-theme>
  <client-only>
    <c-bt-sheet-authentication v-if="!User.getters.isLoggedIn" />
  </client-only>
</template>
