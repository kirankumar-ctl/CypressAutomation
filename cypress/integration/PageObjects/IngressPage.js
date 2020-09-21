///<reference types="cypress" />

import ApiPage from '../PageObjects/ApiPage.js'



class IngressPage{

  verifyIngressCardDetails(){
    var mtoken=Cypress.env('mytoken');
        cy.request({
          method: "get",
          followRedirect: false,
          log: true,
          url:
            "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/ingress",
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
          let impactedCount = response.body.impactedCount +' Impacted';
          cy.get('[aria-label="INGRESS Card"] > .card-body > .card-subtitle').contains('INGRESS');   
          cy.log("ingress count-", ingressCount);
          cy.get('[aria-label="INGRESS Card"] > .card-body > .card-title').contains(ingressCount);
          cy.log("ingress impacted-", impactedCount);
          cy.get('[aria-label="INGRESS Card"] > .card-body > .card-text').contains(impactedCount);
      });     
  }
    verifyAndClickIngressTab()
    {
        cy.get('[aria-label="INGRESS Card"]').should('be.visible').click();
        return this
    }
    verifyIngressGatewaysTab(){
      cy.get('#ingress-list-tab > li:nth-child(1) > a:nth-child(1)').should('be.visible').contains('Gateways');
      cy.log('Gateways tab is visible');
  }
  verifyIngressSBCs(){
      cy.get('#ingress-list-tab > li:nth-child(2) > a:nth-child(1)').should('be.visible').contains('SBCs');
      cy.log('SBCs tab is visible');
  }
    verifyDataTablePresentIngress()
    {
        cy.get('#list-section > div > div > div > div > div:nth-child(2)').should('be.visible');
        return this
    }
    verifyTableHeaderWithApiIngress(){
        var mtoken=Cypress.env('mytoken');
        cy.request({
          method: "get",
          followRedirect: false,
          log: true,
          url:
            "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/ingress",
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