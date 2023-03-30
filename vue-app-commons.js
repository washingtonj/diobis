import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'

import AppComments from './components/app-comments.vue'
import AppInteractions from './components/app-interactions.vue'
import AppMarkdown from './components/app-markdown.vue'
import AppReactions from './components/app-reactions.vue'
import AppSpinner from './components/app-spinner.vue'
import BottomSheet from './components/app-bottom-sheet.vue'
import AppLogo from './components/app-logo.vue'
import AppTooltip from './components/app-tooltip.vue'

export const components = {
  'app-comments': AppComments,
  'app-interactions': AppInteractions,
  'app-markdown': AppMarkdown,
  'app-reactions': AppReactions,
  'app-spinner': AppSpinner,
  'app-bottom-sheet': BottomSheet,
  'app-logo': AppLogo,
  'app-tooltip': AppTooltip
}

export const plugins = {
  createPinia: () => createPinia(),
  createI18n: () => createI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US',
    legacy: false,
    messages: { 'en-US': en }
  })
}
