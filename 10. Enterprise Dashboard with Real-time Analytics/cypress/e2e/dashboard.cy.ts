describe('Dashboard E2E', () => {
  it('redirects to login', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });
});
