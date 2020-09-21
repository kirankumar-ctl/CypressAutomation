import { Given, Then, And, When } from "./node_modules/cypress-cucumber-preprocessor/steps";
import PsapPage from '../PageObjects/PsapPage.js'


const psapPage = new PsapPage()


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

  Then('I verify List and Map tab on PSAP page', () => {
    cy.wait(8000)
    psapPage.validateListTab()
    cy.wait(1000)
    psapPage.validateMapTab()
    cy.log('PSAP page validation successful');
  });
  
  And('I verify Table Header on PSAP page With API', () => {
    cy.wait(2000)
    psapPage.verifyTableHeaderWithApiPSAP()
    cy.log('API validation for table header on PSAP page successful');
   });

  Then('I verify card details on PSAP page With API', () => {
    cy.wait(3000)
    psapPage.verifyPsapCardDetails()
    cy.log('PSAP card details validated successful');
 });

 