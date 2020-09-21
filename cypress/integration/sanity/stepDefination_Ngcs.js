import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import NgcsPage from '../PageObjects/NgcsPage.js'

const ngcsPage= new NgcsPage()

 
  Then('I verify NgcsCore,ComponentStatus and NgcsCoreDevices tab on NGCS page', () => {
    cy.wait(1000)
    ngcsPage.verifyAndClickNgcsTab()
    cy.wait(1000)
    ngcsPage.verifyNgcsCore()
    cy.wait(1000)
    ngcsPage.verifyNgcsCoreDevices()
    ngcsPage.verifyNgcsComponentStatus()
    cy.log('NGCS page validation successful');
   });
  
 And('I verify Table Header on NGCS page With API', () => {
    cy.wait(2000)
    ngcsPage.verifyTableHeaderWithApiNGCS()
    cy.log('API validation for table header on NGCS page successful');
   });

   Then('I verify card details on NGCS page With API', () => {
    cy.wait(3000)
    ngcsPage.verifyNgcsCardDetails()
    cy.log('NGCS card details validated successful');
 });

 
