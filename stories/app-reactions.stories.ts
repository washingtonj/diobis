import { Meta, StoryFn } from '@storybook/vue3'
import AppReactions from '@/components/app-reactions.vue'

export default {
  title: 'App/Reactions',
  component: AppReactions
} as Meta<typeof AppReactions>

const Template: StoryFn<typeof AppReactions> = args => ({
  components: { AppReactions },
  setup () {
    return { args }
  },
  template: `
    <app-reactions v-bind="args" />
  `
})

export const Reactions = Template.bind({})
Reactions.args = {
  reactions: {
    looking: 4,
    rockets: 2,
    heart: 1
  }
}
