import { defineBrowser } from '@/utils/browser'

interface State {
  browser: 'firefox' | 'chrome' | 'safari' | 'edge' | 'ie' | 'opera' | 'unknown' | undefined
}

export const useSettings = defineStore('settings', () => {
  const state = reactive<State>({
    browser: undefined
  })

  onMounted(() => {
    state.browser = defineBrowser()
  })

  return {
    state
  }
})
