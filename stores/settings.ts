import { defineBrowser } from '@/utils/browser'
import { defineDevice } from '@/utils/device'

interface State {
  browser: 'firefox' | 'chrome' | 'safari' | 'edge' | 'ie' | 'opera' | 'unknown' | undefined
  device: 'android' | 'ios' | 'unknown' | undefined
}

export const useSettings = defineStore('settings', () => {
  const state = reactive<State>({
    browser: undefined,
    device: undefined
  })

  const getters = {
    isMobile: computed(() => state.device !== 'unknown')
  }

  onMounted(() => {
    state.browser = defineBrowser()
    state.device = defineDevice()
  })

  return {
    state,
    getters
  }
})
