import { Story } from '@storybook/vue3'
import JobCardRoot from '@/components/jobs-card-root.vue'

export default {
  title: 'Pages/Jobs/Card',
  component: JobCardRoot
}

const Template: Story = args => ({
  components: { JobCardRoot },
  setup () {
    return { args }
  },
  template: "<job-card-root v-bind='args' />"
})

export const Card = Template.bind({})
Card.args = {
  unselectable: false,
  data: {
    id: '1',
    title: 'Software Engineer',
    createdBy: 'IntruderLabs',
    createdAt: '2021-08-01T00:00:00.000Z',
    avatarUrl: 'https://avatars.githubusercontent.com/u/10289071?v=4',
    tags: ['GoLang', 'AWS', 'OpenSearch']
  }
}
