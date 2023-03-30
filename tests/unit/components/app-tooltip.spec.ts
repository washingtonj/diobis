// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import AppTooltip from '@/components/app-tooltip.vue'
import { render } from '@/tests/utils/render'

describe('AppTooltip', () => {
  it('Should render the slot component', () => {
    const wrapper = render(AppTooltip, {
      props: {
        label: 'Testing'
      },
      shallow: true,
      slots: {
        default: '<div id="test-tooltip">Tooltip</div>'
      }
    })

    expect(wrapper.find('#test-tooltip')).toBeTruthy()
  })
})
