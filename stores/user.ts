type State = {
  username?: string
  token?: string
}

export const useUser = defineStore('user', () => {
  const state = ref<State>({
    username: undefined,
    token: undefined
  })

  const actions = {
    setToken: (token: string) => {
      state.value.token = token
    }
  }

  const getters = {
    isLoggedIn: computed(() => !!state.value.token)
  }

  onMounted(() => {
    state.value = JSON.parse(localStorage.getItem('userStore') || '{}')
  })

  watch(state, () => {
    if (state.value.token) {
      localStorage.setItem('userStore', JSON.stringify(state.value))
    }
  }, { deep: true })

  return {
    state,
    actions,
    getters
  }
})
