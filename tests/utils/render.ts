import { defineComponent } from 'vue'
import { mount, MountingOptions } from '@vue/test-utils'
import { components, plugins } from '../../vue-app-commons'

export function withSetup<T> (composable: () => T) {
  const component = defineComponent<T>({
    setup () {
      composable()
    },
    template: '<div />'
  })

  const wrapper = mount(component, {})

  return wrapper
}

export function render (component: any, options: MountingOptions<Record<string, any>> = {}) {
  return mount(component, {
    ...options,
    global: {
      plugins: [plugins.createI18n(), plugins.createPinia()],
      components
    }
  })
}
