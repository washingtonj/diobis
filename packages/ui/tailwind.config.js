/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: ['class', '[data-theme="light"]'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dark', 'dracula', 'black', 'night']
  },
  theme: {},
};