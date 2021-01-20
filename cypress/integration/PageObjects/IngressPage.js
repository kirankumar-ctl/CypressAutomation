///<reference types="cypress" />

import ApiPage from '../PageObjects/ApiPage.js'



class IngressPage {

  verifyIngressCardDetails() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/INGRESS",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      cy.log(response.body);
      expect(response.body).to.not.be.null;
      let ingressCount = response.body.ingressCount;
      let impactedCount = response.body.ingressImpactedCount + ' Impacted';
      cy.get(':nth-child(3) > .-center > .chi-stat__content > #content-div-regular > .chi-stat-metric > .chi-stat-metric__title').contains('INGRESS');
      cy.log("ingress count-", ingressCount);
      cy.get(':nth-child(3) > .-center > .chi-stat__content > #content-div-regular > .chi-stat-metric > div.chi-stat-metric__value').contains(ingressCount);
      cy.log("ingress impacted-", impactedCount);
      cy.get(':nth-child(3) > .-center > .chi-stat__content > #content-div-regular > div.chi-stat-submetric').contains(impactedCount);
    });
  }
  verifyAndClickIngressTab() {
    cy.get('div.chi-col:nth-child(3) > div:nth-child(1) > div:nth-child(1)').should('be.visible').click();
    return this
  }
  verifyIngressGatewaysTab() {
    cy.get('#ingress-list-tab > li:nth-child(1) > a:nth-child(1)').should('be.visible').and('have.text', 'Gateways');
    cy.log('Gateways tab is visible');
  }
  verifyIngressSBCs() {
    cy.get('#ingress-list-tab > li:nth-child(2) > a:nth-child(1)').should('be.visible').and('have.text', 'SBCs');
    cy.log('SBCs tab is visible');
  }

  verifyDataTablePresentIngress() {
    cy.get('#list-section > div > div > div > div > div:nth-child(2)').should('be.visible');
    return this
  }
  verifyTableHeaderWithApiIngress() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/INGRESS",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      cy.log(response.body);
      expect(response.body).to.not.be.null;
      let ingressList = response.body.ingressList;

      ingressList.forEach((item) => {
        expect(item).to.have.all.keys(
          "ingressName",
          "ingressType",
          "status",
          "trunksAvaiable",
          "trunksActive",
          "callsReceived",
          "callsDelivered",
          "linkUitilization"
        );
      });
    });
  }

}
export default IngressPage