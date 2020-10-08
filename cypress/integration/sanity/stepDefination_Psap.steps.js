import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import PsapPage from '../PageObjects/PsapPage.js'


const psapPage = new PsapPage()

Then('I verify List and Map tab on PSAP page', () => {
  cy.wait(8000)
  psapPage.validateListTab();
  cy.wait(1000)
  psapPage.validateMapTab();

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

Then('I calculate logout time for application with maximum timeout {int} min', value => {
  cy.wait(3000)
  psapPage.getAppLogOutTime(value);

});