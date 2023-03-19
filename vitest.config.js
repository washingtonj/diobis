import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImportMerge from './auto-import.config'

export default defineConfig((config) => {
  const upconfig = {
    ...config,
    plugins: [
      vue()
    ]
  }

  return AutoImportMerge(upconfig)
})
