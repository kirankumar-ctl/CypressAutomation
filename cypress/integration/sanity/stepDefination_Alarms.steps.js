import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import AlarmsPage from '../PageObjects/AlarmsPage.js'


const alarmsPage= new AlarmsPage()
 
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