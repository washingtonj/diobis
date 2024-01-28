/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts,svelte}',
    '../../packages/ui/**/*.{html,ts,svelte}',
    './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
  ],
  darkMode: ['class', '[data-theme="light"]'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['dracula', 'dark']
  },
  theme: {}
};
