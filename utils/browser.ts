export function browserDetect () {
  const ua = window.navigator.userAgent

  const msie = ua.indexOf('MSIE ')
  const trident = ua.indexOf('Trident/')
  const edge = ua.indexOf('Edge/')
  const chrome = ua.indexOf('Chrome/')
  const safari = ua.indexOf('Safari/')
  const firefox = ua.indexOf('Firefox/')
  const opera = ua.indexOf('OPR/')

  const isIE = msie > 0 || trident > 0 || edge > 0
  const isEdge = edge > 0
  const isChrome = chrome > 0 && opera === -1
  const isSafari = safari > 0 && chrome === -1
  const isFirefox = firefox > 0
  const isOpera = opera > 0

  function defineBrowser () {
    const browser = browserDetect()
    if (browser.isFirefox) { return 'firefox' }
    if (browser.isChrome) { return 'chrome' }
    if (browser.isSafari) { return 'safari' }
    if (browser.isEdge) { return 'edge' }
    if (browser.isIE) { return 'ie' }
    if (browser.isOpera) { return 'opera' }
    return 'unknown'
  }

  return {
    isIE,
    isEdge,
    isChrome,
    isSafari,
    isFirefox,
    isOpera,
    defineBrowser
  }
}

export function osDetect () {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  const isAndroid = /Android/.test(navigator.userAgent) && !(window as any).MSStream
  const isMac = /Mac/.test(navigator.userAgent)
  const isWindows = /Windows/.test(navigator.userAgent)
  const isLinux = /Linux/.test(navigator.userAgent)

  return {
    isIOS,
    isAndroid,
    isMac,
    isWindows,
    isLinux
  }
}
