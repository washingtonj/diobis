// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { render } from '@/tests/utils/render'
import LayoutHeader from '@/components/layout-header.vue'

describe('LayoutHeader', () => {
  it('Should emit an event for theme change', () => {
    // Given
    const component = render(LayoutHeader, {
      props: {
        isDarkMode: false
      }
    })

    // When
    component.find('#toggleDarkMode').trigger('click')

    // Then
    expect(component.emitted('darkMode')).toBeTruthy()
  })

  it('Should emit an event on click in the logo', () => {
    // Given
    const component = render(LayoutHeader, { props: { isDarkMode: true }, shallow: true })

    // When
    component.find('#logo').trigger('click')

    // Then
    expect(component.emitted('goHome')).toBeTruthy()
  })

  it('Should render the user menu if the user is logged in', () => {
    // Given
    const component = render(LayoutHeader, {
      props: {
        isDarkMode: true,
        user: {
          avatar_url: 'some_avatar_url'
        }
      }
    })

    // When
    const avatar = component.find('#userMenu')

    // Then
    expect(avatar.exists()).toBeTruthy()
  })

  it('Should emit an event on click in the sidebar menu button', () => {
    // Given
    const component = render(LayoutHeader, { props: { isDarkMode: true }, shallow: true })

    // When
    component.find('#toggleSidebar').trigger('click')

    // Then
    expect(component.emitted('toggleSidebar')).toBeTruthy()
  })
})
