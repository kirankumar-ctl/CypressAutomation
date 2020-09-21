import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";


Given('I open NG911 login page', () => {
    cy.loginNg911();
    cy.log('login successful');
   
});

When('I will be on home page', () => {
    cy.get('body');
    cy.wait(8000)
    cy.get('a[aria-label="Lumen"]').should('be.visible');
    cy.log("LUMEN logo is visible");
    cy.log('home page Loaded successful');
  });

 