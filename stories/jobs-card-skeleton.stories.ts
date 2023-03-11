import { Story } from '@storybook/vue3'
import JobCardRoot from '@/components/jobs-card-skeleton.vue'

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

export const Skeleton = Template.bind({})
