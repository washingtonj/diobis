// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { render } from '@/tests/utils/render'

import AppBottomSheet from '@/components/app-bottom-sheet.vue'

describe('AppBottomSheet', () => {
  it('Should emit an event on click in the close button', () => {
    const wrapper = render(AppBottomSheet, {
      props: {
        title: 'TestComponent'
      }
    })

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('Should render with a title', () => {
    const wrapper = render(AppBottomSheet, {
      props: {
        title: 'TestComponent'
      }
    })

    expect(wrapper.find('h2').text()).toContain('TestComponent')
  })
})
