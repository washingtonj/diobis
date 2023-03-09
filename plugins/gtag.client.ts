import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV === 'production') {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: 'G-Q9CW4ZZZ9X'
      }
    })

    trackRouter(useRouter())
  }
})
