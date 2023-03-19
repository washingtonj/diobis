export function browserDetect () {
  const ua = window.navigator.userAgent

  const msie = ua.indexOf('MSIE ')
  const trident = ua.indexOf('Trident/')
  const edge = ua.indexOf('Edg/')
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

  return {
    isIE,
    isEdge,
    isChrome,
    isSafari,
    isFirefox,
    isOpera
  }
}

export function defineBrowser () {
  const browser = browserDetect()
  if (browser.isFirefox) { return 'firefox' }
  if (browser.isChrome) { return 'chrome' }
  if (browser.isSafari) { return 'safari' }
  if (browser.isEdge) { return 'edge' }
  if (browser.isIE) { return 'ie' }
  if (browser.isOpera) { return 'opera' }
  return 'unknown'
}
