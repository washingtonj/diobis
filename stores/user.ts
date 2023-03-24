type State = {
  username?: string
  avatarUrl?: string
  isAuthenticated?: boolean
}

export const useUserStore = defineStore('user', () => {
  const state = ref<State>({})

  const actions = {
    setAuthentication: () => {
      state.value.isAuthenticated = true
    },

    setAvatarUrl: (avatarUrl: string) => {
      state.value.avatarUrl = avatarUrl
    }
  }

  onMounted(() => {
    state.value = JSON.parse(localStorage.getItem('userStore') || '{}')
  })

  watch(state, () => {
    if (Object.keys(state.value).length > 0) {
      localStorage.setItem('userStore', JSON.stringify(state.value))
    }
  }, { deep: true })

  return {
    state,
    actions
  }
})
