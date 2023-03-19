// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { withSetup } from '@/utils/test-utils'
import { useErrorHandling } from '@/composables/useErrorHandling'

const showErrorMock = vi.fn()

describe('useErrorHandling', () => {
  beforeEach(() => {
    showErrorMock.mockClear()
  })

  it('Should throw a nuxt error if on server side', () => {
    // Given
    vi.stubGlobal('process', { server: true })
    vi.stubGlobal('showError', showErrorMock)

    // When
    withSetup(() => useErrorHandling({ value: { data: 'error' } }))

    // Then
    expect(showErrorMock).toBeCalledWith('error')
  })

  it('Should throw a nuxt error if on client side', () => {
    // Given
    vi.stubGlobal('process', { client: true })
    vi.stubGlobal('showError', showErrorMock)

    // When
    const app = withSetup(() => useErrorHandling({ value: { data: 'error' } }))

    app.vm.$forceUpdate()

    // Then
    app.vm.$nextTick(() => {
      expect(showErrorMock).toBeCalledWith('error')
    })
  })

  it('Should not throw if dont have error param', () => {
    // Given
    vi.stubGlobal('process', { client: true })
    vi.stubGlobal('showError', showErrorMock)

    // When
    withSetup(() => useErrorHandling({ value: null }))

    expect(showErrorMock).not.toBeCalled()
  })
})
