import { Story, Meta } from '@storybook/vue3'
import AppMarkdown from '@/components/app-markdown.vue'

export default {
  title: 'App/Markdown',
  component: AppMarkdown
} as Meta<typeof AppMarkdown>

const Template: Story<typeof AppMarkdown> = args => ({
  components: { AppMarkdown },
  setup () {
    return { args }
  },
  template: '<app-markdown v-bind="args" />'
})

export const Markdown = Template.bind({})
Markdown.args = {
  content: '# Hello World'
}
