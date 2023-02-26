export function useErrorHandling (error: any) {
  function onServerSide () {
    showError(error.value.data)
  }

  function onClientSide () {
    onUpdated(() => {
      showError(error.value.data)
    })
  }

  if (!error.value) { return }

  process.client ? onClientSide() : onServerSide()
}
