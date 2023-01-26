import { en, pt_BR } from './locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'pt_BR',
      fallbackLocale: 'pt_BR',
      messages: { pt_BR, en }
    }
  }
})
