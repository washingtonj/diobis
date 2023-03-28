import { Story } from '@storybook/vue3'
import AppLogo from '@/components/app-logo.vue'

export default {
  title: 'App/Logo',
  component: AppLogo
}

const Template: Story = args => ({
  components: { AppLogo },
  setup () {
    return { args }
  },
  template: '<app-layout-logo v-bind="args" />'
})

export const Logo = Template.bind({})
