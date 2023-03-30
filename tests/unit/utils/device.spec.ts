// @vitest-environment jsdom

import { vi, describe, it, expect } from 'vitest'
import { defineDevice, deviceDetect } from '@/utils/device'

describe('deviceDetect', () => {
  it('should correctly detect if the user agent is Android', () => {
    // Given
    const userAgent = vi.spyOn(window.navigator, 'userAgent', 'get')
    userAgent.mockReturnValue('Mozilla/5.0 (Linux; Android 11; Pixel 4a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36')

    // Then
    expect(defineDevice()).toBe('android')
    expect(deviceDetect().isAndroid).toBe(true)
  })

  it('should correctly detect if the user agent is iOS', () => {
    // Given
    const userAgent = vi.spyOn(window.navigator, 'userAgent', 'get')
    userAgent.mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1')

    // Then
    expect(defineDevice()).toBe('ios')
    expect(deviceDetect().isIOS).toBe(true)
  })

  it('Should correctly detect if the user agent is non mobile', () => {
    // Given
    const userAgent = vi.spyOn(window.navigator, 'userAgent', 'get')
    userAgent.mockReturnValue('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36')

    // Then
    expect(defineDevice()).toBe('unknown')
    expect(deviceDetect().isAndroid).toBe(false)
    expect(deviceDetect().isIOS).toBe(false)
  })
})
