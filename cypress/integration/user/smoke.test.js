/// <reference types="cypress" />

import Chance from 'chance'

const chance = new Chance()
const EMAIL = Cypress.env('USER_EMAIL')
const PASSWORD = Cypress.env('USER_PASSWORD')

if (!EMAIL || !PASSWORD) {
  throw new Error(
    'You must provide CYPRESS_USER_EMAIL and CYPRESS_USER_PASSWORD environment variables'
  )
}

function login(email = EMAIL, password = PASSWORD) {
  cy.get('[data-testid=login]').click()
  cy.get('[name=email]').type(email)
  cy.get('[name=password]').type(password)
  cy.get('[data-testid=submit-button').click()
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  cy.get('[data-testid=logged-in-email]').contains(email)
  cy.get('[data-testid=login]').should('not.exist')
  cy.get('[data-testid=logout]').should('exist')
}

describe('smoke tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept('POST', '/api/user/send-password-reset-email', {
      statusCode: 200,
      body: {}
    }).as('sendPasswordResetEmail')
  })

  it('should login and provider the username on the landing page', () => {
    login()
    cy.get('[data-testid=logged-in-email]').contains(EMAIL)
    cy.get('[data-testid=login]').should('not.exist')
    cy.get('[data-testid=logout]').should('exist')
  })

  it('should register a new user', () => {
    const email = chance.email()
    const password = chance.string({ length: 8 })

    cy.get('[data-testid=login]').click()
    cy.get('[data-testid=sign-up-link]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/sign-up`)
    cy.get('[name="profile.firstName"]').type(chance.first())
    cy.get('[name="profile.lastName"]').type(chance.last())
    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(password)
    cy.get('[data-testid=sign-up-button]').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    login(email, password)
  })

  it('should show the correct errors on the login screen', () => {
    const email = chance.email()
    const password = chance.string({ length: 8 })

    cy.get('[data-testid=login]').click()
    cy.get('[data-testid=submit-button').click()
    cy.get('[data-testid=email-error]').contains(
      'Please provide a valid email address'
    )
    cy.get('[data-testid=password-error]').contains(
      'Please provide a password with a minimum of 8 characters'
    )
    cy.get('[name=email]').type(email)
    cy.get('[data-testid=email-error]').should('not.exist')
    cy.get('[name=password]').type(password)
    cy.get('[data-testid=password-error]').should('not.exist')
  })

  it('should not allow unauthorized users to view the "private-server" page', () => {
    cy.visit('/private-server')
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })

  it('should not allow unauthorized users to view the "private-client" page', () => {
    cy.visit('/private-client')
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })

  it('should allow authorized users to view the "private-server" page', () => {
    login()
    cy.visit('/private-server')
    cy.url().should('eq', `${Cypress.config().baseUrl}/private-server`)
  })

  it('should allow authorized users to view the "private-client" page', () => {
    login()
    cy.visit('/private-client')
    cy.url().should('eq', `${Cypress.config().baseUrl}/private-client`)
  })

  it.only('should allow the user to reset their password', () => {
    cy.contains('Reset Password').click()
    cy.get('[name=email]').type(EMAIL)
    cy.get('[data-testid=reset-password-email-form]').should('exist')
    cy.get('[data-testid=reset-password-submit-button]').click()
    cy.wait('@sendPasswordResetEmail')
    cy.get('[data-testid=reset-password-email-form]').should('not.exist')
    cy.get('[name=code]').type('123456')
    cy.get('[name=newPassword]').type('new-password')
    cy.get('[name=confirmPassword]').type('new-password')
    cy.get('[data-testid=reset-update-password-submit]').click()
  })
})
