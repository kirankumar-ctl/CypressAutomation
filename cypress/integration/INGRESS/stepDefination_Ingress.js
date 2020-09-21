import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import IngressPage from '../PageObjects/IngressPage.js'

const ingressPage= new IngressPage()

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
