import { Story, Meta } from '@storybook/vue3'
import BSheetAuthentication from '@/components/bt-sheet-authentication.vue'

export default {
  title: 'BottomSheets/Authentication',
  component: BSheetAuthentication,
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true
      }
    }
  },
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
} as Meta<typeof BSheetAuthentication>

export const Authentication: Story<typeof BSheetAuthentication> = () => ({
  components: { BSheetAuthentication },
  template: '<BSheetAuthentication />'
})
