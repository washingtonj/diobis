// @vitest-environment jsdom

import { vi, describe, it, expect, SpyInstance, beforeEach } from 'vitest'
import { browserDetect, defineBrowser } from '@/utils/browser'

let userAgent: SpyInstance

describe('browserDetect', () => {
  beforeEach(() => {
    userAgent = vi.spyOn(window.navigator, 'userAgent', 'get')
  })

  it('should correctly detect if the user agent is Internet Explorer', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64; Trident/7.0; rv:11.0) like Gecko')

    expect(browserDetect().isIE).toBe(true)
    expect(defineBrowser()).toBe('ie')
  })

  it('should correctly detect if the user agent is Edge', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/91.0.864.59')

    expect(browserDetect().isEdge).toBe(true)
    expect(defineBrowser()).toBe('edge')
  })

  it('should correctly detect if the user agent is Chrome', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36')

    expect(browserDetect().isChrome).toBe(true)
    expect(defineBrowser()).toBe('chrome')
  })

  it('should correctly detect if the user agent is Safari', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Version/14.0.1 Safari/537.36')

    expect(browserDetect().isSafari).toBe(true)
    expect(defineBrowser()).toBe('safari')
  })

  it('should correctly detect if the user agent is Firefox', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0')

    expect(browserDetect().isFirefox).toBe(true)
    expect(defineBrowser()).toBe('firefox')
  })

  it('should correctly detect if the user agent is Opera', () => {
    userAgent.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 OPR/77.0.4054.277')

    expect(browserDetect().isOpera).toBe(true)
    expect(defineBrowser()).toBe('opera')
  })

  it('should correctly detect if the user agent is unknown', () => {
    userAgent.mockReturnValue('')

    expect(defineBrowser()).toBe('unknown')
  })
})
