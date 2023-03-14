describe('Auth - Flow', () => {
  it('Should show the authentication bottom sheet if user is not authenticated', () => {
    cy.visit('localhost:3000')
    cy.get('#bt-sheet-authentication').should('be.visible')
  })
})
