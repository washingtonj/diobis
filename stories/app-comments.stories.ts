import { Story, Meta } from '@storybook/vue3'
import AppComments from '@/components/app-comments.vue'

export default {
  title: 'App/Comments',
  component: AppComments
} as Meta<typeof AppComments>

const Template: Story<typeof AppComments> = args => ({
  components: { AppComments },
  setup () {
    return { args }
  },
  template: '<app-comments v-bind="args" />'
})

export const Comments = Template.bind({})
Comments.args = {
  comments: [
    {
      isAuthor: false,
      name: 'Washington Junior',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '2021-01-01T00:00:00.000Z',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.'
    },
    {
      isAuthor: true,
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      date: '2021-01-01T00:00:00.000Z',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nisl nisl aliquet nisl, eget aliquet nisl nisl sit amet nisl.'
    }
  ]
}
