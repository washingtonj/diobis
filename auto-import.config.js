/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * These settings are used to automatically import outside of Nuxt, tools like Vitest and Storybook use to resolve path aliases and imports.
 * There's probably another good way to do this, but you need to investigate nuxt3's auto-import and find a way to import directly from it.
 */

const fs = require('fs')
const { resolve } = require('path')
const { mergeConfig } = require('vite')
const AutoImport = require('unplugin-auto-import/vite')
const VueI18nPlugin = require('@intlify/unplugin-vue-i18n/vite')

const NuxtTsConfig = fs.readFileSync('./.nuxt/tsconfig.json').toString()
const tsConfigFormated = JSON.parse(
  NuxtTsConfig.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? '' : m)
  )
)

const r = p => resolve(process.cwd(), p)

const alias = {}

Object.entries(tsConfigFormated.compilerOptions.paths).forEach(
  ([key, value]) => {
    alias[key] = r(value[0])
  }
)

module.exports = function (config) {
  return mergeConfig(config, {
    plugins: [
      VueI18nPlugin({
        /* options */
        // locale messages resource pre-compile option
        include: resolve('./locales/**')
      }),
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          'vue-i18n',
          { pinia: ['defineStore'] }
        ],
        dirs: ['./composables'],
        presetOverriding: true,
        vueTemplate: true,
        sourceMap: true,
        dts: false
      })],
    resolve: {
      alias
    }
  })
}
