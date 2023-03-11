import { Story } from '@storybook/vue3'
import AppSpinner from '@/components/app-spinner.vue'

export default {
  title: 'App/Spinner',
  component: AppSpinner
}

export const Spinner: Story = args => ({
  components: { AppSpinner },
  setup () {
    return { args }
  },
  template: '<AppSpinner v-bind="args" />'
})
