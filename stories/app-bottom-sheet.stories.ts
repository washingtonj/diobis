import { Story, Meta } from '@storybook/vue3'
import AppBottomSheet from '@/components/app-bottom-sheet.vue'

export default {
  title: 'App/BottomSheet',
  component: AppBottomSheet,
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    close: {
      action: 'close'
    }
  }
} as Meta<typeof AppBottomSheet>

export const BottomSheet: Story<typeof AppBottomSheet> = args => ({
  components: { AppBottomSheet },
  setup () {
    return {
      args: {
        title: 'Bottom Sheet Component',
        ...args
      }
    }
  },
  template: `
  <AppBottomSheet v-bind="args" @close="args.close">
    <p>Bottom Sheet Content</p>
  </AppBottomSheet>
  `
})
