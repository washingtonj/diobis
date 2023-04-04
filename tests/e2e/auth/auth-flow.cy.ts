describe('Auth - Flow', () => {
  it.only('Should authenticate using GitHub and redirect to the home page', () => {
    cy.visit('localhost:3000')

    cy.get('#btn-authenticate').click()
    cy.get('#btn-gh-authentication').click()

    cy.visit('localhost:3000/signin?code=1234567890')

    cy.intercept('GET', '/api/auth?authCode=1234567890', {
      delay: 2000,
      body: { user: { login_id: 'test', avatar_url: 'https://avatars.githubusercontent.com/u/55254037?v=4' } }
    })

    cy.get('#userMenu').should('be.visible')
  })
})
