import { Meta, Story } from '@storybook/vue3'
import AppInteractions from '@/components/app-interactions.vue'

export default {
  title: 'App/Interactions',
  components: { AppInteractions }
} as Meta<typeof AppInteractions>

const Template: Story<typeof AppInteractions> = args => ({
  components: { AppInteractions },
  setup () {
    return { args }
  },
  template: '<app-interactions v-bind="args" />'
})

export const Interactions = Template.bind({})
Interactions.args = {
  interactions: {
    comments: 10
  }
}
