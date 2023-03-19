import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    specPattern: 'tests/e2e/**/*.cy.ts',
    setupNodeEvents (_on, _config) {
      // implement node event listeners here
    }
  },
  component: {
    specPattern: 'tests/components/**/*.cy.ts',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        configFile: 'vitest.config.js'
      }
    }
  }
})
