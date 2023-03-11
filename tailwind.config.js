/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./components/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system']
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last', '& > :not(:last-child)')
    })
  ],
  darkMode: 'class'
}
