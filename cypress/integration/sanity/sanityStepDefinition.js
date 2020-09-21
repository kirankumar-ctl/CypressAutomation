/*import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import PsapPage from '../PageObjects/PsapPage.js'
import NgcsPage from '../PageObjects/NgcsPage.js'
import IngressPage from '../PageObjects/IngressPage.js'
import AlarmsPage from '../PageObjects/AlarmsPage.js'

const psapPage = new PsapPage()
const ngcsPage= new NgcsPage()
const ingressPage= new IngressPage()
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

 Then('I verify Gateways, SBCs Tabs and data table present on INGRESS page', () => {
    cy.wait(1000)
      ingressPage.verifyAndClickIngressTab() 
      cy.wait(3000)
      ingressPage.verifyDataTablePresentIngress()
      ingressPage.verifyIngressGatewaysTab()
      ingressPage.verifyIngressSBCs()
   });
 Then('I verify card details on INGRESS page With API', () => {
      cy.wait(3000)
      ingressPage.verifyIngressCardDetails()
      cy.log('INGRESS card details validated successful');
   });

 And('I verify Table Header on INGRESS page With API', () => {
    cy.wait(2000)
    ingressPage.verifyTableHeaderWithApiIngress()
    cy.log('API validation for table header on ingress page successful');
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
 });*/