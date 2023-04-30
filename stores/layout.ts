interface State {
  theme: 'light' | 'dark'
}

export const useLayoutStore = defineStore('layout', () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const state = reactive<State>({
    theme: isDark ? 'dark' : 'light'
  })

  const getters = {
    isDark: computed(() => state.theme === 'dark'),
    bgColor: computed(() => state.theme ? '#0f172a' : '#ffffff')
  }

  const actions = {
    toggleTheme () {
      toggleDark()
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
  }

  return {
    ...state,
    ...getters,
    ...actions
  }
})
