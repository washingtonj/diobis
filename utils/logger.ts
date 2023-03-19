/* eslint-disable no-console */

export function Logger (propertyKey: string, msg: string) {
  const USE_DEBUG = process.env.NODE_ENV === 'development'

  if (USE_DEBUG) {
    console.log(`%c[${propertyKey}]`, 'color: #00b894', msg)
  }
}
