export function renderOnClient(callback: () => void) {
  if (typeof window !== 'undefined') {
    callback();
  }
}
