import { app } from '@storybook/vue3'
import { components, plugins } from '../vue-app-commons'

const i18n = plugins.createI18n()
const pinia = plugins.createPinia()

Object.keys(components).forEach((key) => {
  app.component(key, components[key])
})

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