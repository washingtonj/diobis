export function useErrorHandling (error: any) {
  if (!error.value) { return }

  if (process.server) {
    showError(error.value.data)
  }

  onUpdated(() => {
    showError(error.value.data)
  })
}
