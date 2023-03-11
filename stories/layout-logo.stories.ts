import { Story } from '@storybook/vue3'
import AppLayoutLogo from '@/components/layout-logo.vue'

export default {
  title: 'Layout/Logo',
  component: AppLayoutLogo
}

const Template: Story = args => ({
  components: { AppLayoutLogo },
  setup () {
    return { args }
  },
  template: '<app-layout-logo v-bind="args" />'
})

export const Logo = Template.bind({})
