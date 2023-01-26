const USE_DEBUG = process.env.NODE_ENV === 'development'

export function Logger(propertyKey: string, msg: string) {
  if (USE_DEBUG) {
    console.log(`%c[${propertyKey}]`, 'color: #00b894', msg)
  }
}