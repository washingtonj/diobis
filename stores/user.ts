type State = {
  username?: string
  token?: string
  avatarUrl?: string
}

export const useUser = defineStore('user', () => {
  const state = ref<State>({})

  const actions = {
    setToken: (token: string) => {
      state.value.token = token
    },

    setAvatarUrl: (avatarUrl: string) => {
      state.value.avatarUrl = avatarUrl
    }
  }

  const getters = {
    isLoggedIn: computed(() => !!state.value.token)
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
    actions,
    getters
  }
})
