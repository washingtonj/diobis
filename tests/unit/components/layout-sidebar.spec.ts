// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { render } from '@/tests/utils/render'
import LayoutSidebar from '@/components/layout-sidebar.vue'

describe('LayoutSidebar', () => {
  it('Should emit an event for page change', () => {
    // Given
    const component = render(LayoutSidebar, {
      props: {
        navbar: [{
          id: 'Home',
          title: 'Home',
          path: '/',
          icon: 'home'
        }]
      }
    })

    // When
    component.find('#Home').trigger('click')

    // Then
    expect(component.emitted('pageChange')).toBeTruthy()
  })

  it('Should emit an event on click outside component', () => {
    // Given
    const component = render(LayoutSidebar, {
      props: {
        hidden: false,
        navbar: [{
          id: 'Home',
          title: 'Home',
          path: '/',
          icon: 'home'
        }]
      }
    })

    // When
    document.dispatchEvent(new Event('click'))

    // Then
    expect(component.emitted('update:hidden')).toBeTruthy()
  })
})
