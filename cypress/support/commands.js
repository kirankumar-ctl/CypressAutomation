// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const defaultMockedCall = {
    name: '',
    url: '',
    method: 'GET',
    responseFixture: 'fixture:responses/empty',
    status: 200,
    cookies: [],
  };
  Cypress.Commands.add('visitWithMocks', (url, mockedCalls) => {
    cy.server();
    (mockedCalls || []).forEach(mock => {
      const mockedCall = { ...defaultMockedCall, ...mock };
      (mock.cookies || []).forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain || window.location.hostname,
        });
      });
      console.log(mockedCall);
      cy.route({
        method: mockedCall.method,
        url: mockedCall.url,
        response: mockedCall.responseFixture,
        status: mockedCall.status,
      }).as(mockedCall.name);
    });
    cy.visit(url);
  });