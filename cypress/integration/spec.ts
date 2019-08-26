describe('CRA', () => {
  it('shows learn link', function() {
    cy.visit('http://localhost:3000')
    cy.get('.title').should('be.visible')
      .and('have.text', 'Hello New Web App!')
  })
})