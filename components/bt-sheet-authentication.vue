<script lang="ts" setup>
export type Emits = {
  (event: 'close'): void
  (event: 'login'): void
}

defineEmits<Emits>()

</script>

<template>
  <app-bottom-sheet id="bt-sheet-authentication" title="Faça login com o GitHub" @close="$emit('close')">
    <p class="text-sm">
      Nossa plataforma é baseada em repositórios do GitHub, algumas funcionalidade só estão disponíveis para usuários
      autenticados.
    </p>
    <p class="text-gray-500 text-xs">
      Mais informações na tela de login.
    </p>
    <button id="btn-authenticate" class="md:w-40 bg-blue-600 py-2 px-4 mt-4 text-white w-full rounded-md" @click="$emit('login')">
      Entrar
    </button>
  </app-bottom-sheet>
</template>
