import { en, ptBR } from './locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  pinia: {
    autoImports: [
      'defineStore'
    ]
  },
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'ptBR',
      fallbackLocale: 'ptBR',
      messages: { ptBR, en }
    }
  },
  build: {
    transpile: ['@heroicons/vue']
  }
})
