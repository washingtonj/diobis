<script lang="ts" setup>
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/20/solid'
import { type Query } from '@/server/api/auth'
import { useUserStore } from '@/stores/user'

const Route = useRoute()
const Router = useRouter()
const User = useUserStore()

const isLoading = ref(false)

const SignInBenefits = [
  'Fazer parte da comunidade. ✅',
  'Interagir por meio de comentários. 🛠️',
  'Deixar reações. 👷‍♀️',
  'Acompanhar vagas que você tem interesse. 👷‍♀️',
  'Criar e editar vagas. 👷‍♀️'
]

definePageMeta({
  layout: 'flat'
})

onMounted(() => {
  if (Route.query.renew) {
    requestOAuthAccessToken()
    return
  }

  if (!Route.query.code) { return }

  $fetch('/api/auth', {
    server: false,
    params: { authCode: Route.query.code } as Query
  })
    .then(({ user }) => {
      User.actions.setAvatarUrl(user.avatar_url)
      User.actions.setAuthentication()
      Router.push('/')
    })
    .finally(() => {
      isLoading.value = false
    })
})

function requestOAuthAccessToken () {
  window.open('https://github.com/login/oauth/authorize?client_id=cb7d3f1bf3aec5645334&scope=public_repo,repo_public&redirect_uri=https://diobis.app/signin', '_self')
}

</script>

<template>
  <div class="container mx-auto max-w-screen-sm p-8">
    <div class="flex flex-col items-start mt-[5vh] bg-blue-50 shadow-lg dark:bg-black/20 rounded-xl px-8 pt-4 pb-10">
      <div class="w-full flex items-center mb-10 border-b-2" to="/">
        <MagnifyingGlassCircleIcon class="w-8 h-8 mr-2 fill-blue-600 text-white" />
        <layout-logo class="w-20 h-20 fill-black dark:fill-white" />
      </div>

      <span>
        <h1 class="text-3xl font-bold mb-2">
          Entrar
        </h1>

        <p class="mb-8">
          Nossa plataforma é totalmente baseada no GitHub, para que você possa interagir e desfrutar de tudo que temos a
          oferecer, é necessário que você faça login com sua conta.
        </p>
      </span>

      <span class="w-full text-start">
        <h5 class="font-bold">
          Ao fazer login você poderá:
        </h5>
        <ul class="text-sm list-disc list-inside">
          <li v-for="benefit, index in SignInBenefits" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </span>

      <span v-if="User.state.isAuthenticated" class="w-full flex justify-center bg-green-500 p-2 mt-8 rounded-lg">
        <p class="text-sm">Você está autenticado! 🥳</p>
      </span>

      <template v-else>
        <button
          v-if="!isLoading"
          class="flex w-full justify-center self-start items-center text-white bg-black py-2.5  rounded-md mt-12"
          @click="requestOAuthAccessToken"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-5 mr-2.5" viewBox="0 0 1024 1024" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              transform="scale(64)"
            />
          </svg>
          Entrar com o GitHub
        </button>

        <div v-else class="w-full flex items-center justify-center mt-12">
          <app-spinner />
        </div>
      </template>
    </div>

    <span class="flex justify-center mt-6">
      <nuxt-link class="text-sm text-center text-blue-700" to="/">
        Voltar para a página inicial
      </nuxt-link>
    </span>
  </div>
</template>
