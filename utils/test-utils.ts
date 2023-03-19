import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

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
