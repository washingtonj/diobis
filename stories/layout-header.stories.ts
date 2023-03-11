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

export const Header = Template.bind({})
Header.args = {
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
