import { Story, Meta } from '@storybook/vue3'
import JobComments from '@/components/job-comments.vue'

export default {
  title: 'Pages/Job/Comments',
  component: JobComments,
  argTypes: {
    data: {
      control: {
        type: 'object'
      }
    },
    isLoading: {
      control: {
        type: 'boolean'
      }
    },
    isFirefox: {
      control: {
        type: 'boolean'
      }
    },
    show: {
      action: 'show'
    }
  }
} as Meta<typeof JobComments>

const Template: Story = args => ({
  components: { JobComments },
  setup () {
    return { args }
  },
  template: '<job-comments v-bind="args" @show="args.show" />'
})

export const Loaded = Template.bind({})
Loaded.args = {
  data: [
    {
      isAuthor: false,
      name: 'John Doe',
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      date: '2021-01-01 00:00:00',
      comment: 'Do you have more information about this job?'
    },
    {
      isAuthor: true,
      name: 'Jane Doe',
      avatar: 'https://www.gravatar.com/avatar',
      date: '2021-01-01 00:00:00',
      comment: 'Yes, I have more information about this job.'
    },
    {
      isAuthor: true,
      name: 'Jane Doe',
      avatar: 'https://www.gravatar.com/avatar',
      date: '2021-01-01 00:00:00',
      comment: 'If you are interested, please contact me.'
    },
    {
      isAuthor: false,
      name: 'John Doe',
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      date: '2021-01-01 00:00:00',
      comment: 'I am interested, please contact me.'
    },
    {
      isAuthor: true,
      name: 'Jane Doe',
      avatar: 'https://www.gravatar.com/avatar',
      date: '2021-01-01 00:00:00',
      comment: 'Ok, I will contact you. Thank you.'
    }
  ],
  isLoading: false,
  isFirefox: false
}

export const Started = Template.bind({})
Started.args = {
  data: [],
  isLoading: false,
  isFirefox: false
}

export const Loading = Template.bind({})
Loading.args = {
  data: [],
  isLoading: true,
  isFirefox: false
}
