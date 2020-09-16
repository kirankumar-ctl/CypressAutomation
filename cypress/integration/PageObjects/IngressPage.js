///<reference types="cypress" />

class IngressPage{

    verifyAndClickIngressTab()
    {
        cy.get('[aria-label="INGRESS Card"]').should('be.visible').click();
        return this
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