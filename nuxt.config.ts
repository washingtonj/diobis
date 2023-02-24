import { en, ptBR } from './locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'pt_BR',
      fallbackLocale: 'pt_BR',
      messages: { ptBR, en }
    }
  },
  build: {
    transpile: ['@heroicons/vue']
  }
})
