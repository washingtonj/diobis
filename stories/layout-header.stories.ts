import { Story } from '@storybook/vue3'
import LayoutHeader from '@/components/layout-header.vue'

export default {
  title: 'Layout/Header',
  component: LayoutHeader
}

const Template: Story = args => ({
  components: { LayoutHeader },
  setup () {
    return { args }
  },
  template: '<LayoutHeader v-bind="args" />'
})

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  isDarkMode: true,
  currentRoute: '/about',
  navbar: [
    {
      id: 'home',
      title: 'Home',
      path: '/'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about'
    },
    {
      id: 'contact',
      title: 'Contact',
      path: '/contact'
    }
  ]
}

export const Logged = Template.bind({})
Logged.args = {
  isDarkMode: true,
  currentRoute: '/about',
  navbar: [
    {
      id: 'home',
      title: 'Home',
      path: '/'
    },
    {
      id: 'about',
      title: 'About',
      path: '/about'
    },
    {
      id: 'contact',
      title: 'Contact',
      path: '/contact'
    }
  ],
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/55254037?s=60&v=4'
  }
}
