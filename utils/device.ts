export function deviceDetect () {
  const ua = window.navigator.userAgent

  const isAndroid = ua.indexOf('Android') > 0
  const isIOS = ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0

  return {
    isAndroid,
    isIOS
  }
}

export function defineDevice () {
  const device = deviceDetect()
  if (device.isAndroid) { return 'android' }
  if (device.isIOS) { return 'ios' }
  return 'unknown'
}
