// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import { components, plugins } from '../../vue-app-commons'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

const pinia = plugins.createPinia()
const i18n = plugins.createI18n()

Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {}
  options.global.components = options.global.components || {}
  options.global.plugins = options.global.plugins || []

  // Merge global components with the ones passed in
  options.global.components = {
    ...components,
    ...options.global.components
  }

  // Merge global plugins with the ones passed in
  options.global.plugins.push(pinia)
  options.global.plugins.push(i18n)

  return mount(component as any, options)
})

// Example use:
// cy.mount(MyComponent)
