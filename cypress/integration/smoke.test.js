/// <reference types="cypress" />

function login() {
  cy.get('[data-testid="login"]').click()
  cy.get('[name="email"]').type('hello@mvirando.com')
  cy.get('[name="password"]').type('password')
}

describe('smoke tests', () => {
  before(() => {
    cy.visit('/')
  })

  it('should login and provider the username on the landing page', () => {
    login()
  })
})
