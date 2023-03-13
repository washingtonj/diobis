import { Story, Meta } from '@storybook/vue3'
import { ref } from 'vue'
import JobComments from '@/components/job-comments.vue'

const mock = [
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
]

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

export const WaitingTheTrigger: Story = args => ({
  components: { JobComments },
  setup () {
    const comments = ref<any[]>([])
    const isLoading = ref<boolean>(false)

    function getComments () {
      isLoading.value = true
      args.show()

      setTimeout(() => {
        comments.value = mock
        isLoading.value = false
      }, 2000)
    }

    return {
      getComments,
      isLoading,
      comments,
      args: {
        ...args,
        isEmpty: false,
        isFirefox: false,
        isAuthenticated: false
      }
    }
  },
  template: '<job-comments v-bind="args" :data="comments" :is-loading="isLoading" @show="getComments" />'
})

export const LoadingComments: Story = () => ({
  components: { JobComments },
  setup () {
    return {
      args: {
        data: [],
        isLoading: true,
        isEmpty: false,
        isFirefox: false,
        isAuthenticated: false
      }
    }
  },
  template: '<job-comments v-bind="args" @show="args.show" />'
})

export const AuthenticatedWithComments: Story = () => ({
  components: { JobComments },
  setup () {
    return {
      args: {
        data: mock,
        isLoading: false,
        isFirefox: false,
        isAuthenticated: true
      }
    }
  },
  template: '<job-comments v-bind="args" @show="args.show" />'
})

export const AuthenticatedWithoutComments: Story = () => ({
  components: { JobComments },
  setup () {
    return {
      args: {
        data: [],
        isLoading: false,
        isEmpty: true,
        isFirefox: false,
        isAuthenticated: true
      }
    }
  },
  template: '<job-comments v-bind="args" @show="args.show" />'
})

export const UnauthenticatedWithComments: Story = () => ({
  components: { JobComments },
  setup () {
    return {
      args: {
        data: mock,
        isLoading: false,
        isFirefox: false,
        isAuthenticated: false
      }
    }
  },
  template: '<job-comments v-bind="args" @show="args.show" />'
})
