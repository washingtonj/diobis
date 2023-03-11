import { app } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import AppComments from '../components/app-comments.vue'
import AppInteractions from '../components/app-interactions.vue'
import AppMarkdown from '../components/app-markdown.vue'
import AppReactions from '../components/app-reactions.vue'
import AppSpinner from '../components/app-spinner.vue'

import en from '../locales/en.json'

const pinia = createPinia()

const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  legacy: false,
  messages: { 'en-US': en }
})

app.component('app-comments', AppComments)
app.component('app-interactions', AppInteractions)
app.component('app-markdown', AppMarkdown)
app.component('app-reactions', AppReactions)
app.component('app-spinner', AppSpinner)

app.use(i18n)
app.use(pinia)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'dark'
  },
  themes: {
    clearable: false,
    list: [
      {
        name: 'Light',
        class: [],
        color: '#ffffff',
        default: true
      },
      {
        name: 'Dark',
        // The class dark will be added to the body tag
        class: ['dark'],
        color: '#000000'
      }
    ]
  }
}

export const decorators = [
  (Story) => ({
    components: { Story },
    i18n,
    template: `
      <suspense>
        <div class="text-black dark:text-white">
          <story />
        </div>
        <template #fallback>
          <div class="flex justify-center items-center h-96">
            <div class="text-2xl">Loading async component...</div>
          </div>
        </template>
      </suspense>
    `,
  })
]