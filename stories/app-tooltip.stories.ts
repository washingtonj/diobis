import { Story, Meta } from '@storybook/vue3'
import AppTooltip from '@/components/app-tooltip.vue'

export default {
  title: 'App/Tooltip',
  component: AppTooltip
} as Meta<typeof AppTooltip>

const Template: Story<typeof AppTooltip> = args => ({
  components: { AppTooltip },
  setup () {
    return { args }
  },
  template: '<app-tooltip v-bind="args"><button>Hover here!</button></app-tooltip> '
})

export const Tooltip = Template.bind({})
Tooltip.args = {
  label: 'Hi, I\'m a tooltip'
}
