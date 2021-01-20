import { Given, Then, And, When } from "cypress-cucumber-preprocessor/steps";
import IngressPage from '../PageObjects/IngressPage.js'

const ingressPage = new IngressPage()

Then('I verify Gateways, SBCs Tabs and data table present on INGRESS page', () => {
   cy.wait(1000)
   ingressPage.verifyAndClickIngressTab()
   cy.wait(3000)
   //ingressPage.verifyDataTablePresentIngress()
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
