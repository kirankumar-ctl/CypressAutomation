import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import AlarmsPage from '../PageObjects/AlarmsPage.js'


const alarmsPage= new AlarmsPage()


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

 
 Then('I verify data table present on ALARMS page', () => {
      cy.wait(1000)
      alarmsPage.verifyAndClickAlarmsTab()
      cy.wait(3000)
      alarmsPage.verifyDataTablePresentAlarms()
      cy.log('ALARMS page validation successful');
   });

 And('I verify Table Header on ALARMS page With API', () => {
      cy.wait(2000)
      alarmsPage.verifyTableHeaderWithApi()
      cy.log('API validation for table header on Alarms page successful');
   });

   Then('I verify card details on ALARMS page With API', () => {
    cy.wait(3000)
    alarmsPage.verifyAlarmsCardDetails()
    cy.log('ALARMS card details validated successful');
 });