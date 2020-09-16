///<reference types="cypress" />

class NgcsPage{

    verifyAndClickNgcsTab()
    {
        cy.get('[aria-label="NGCS Card"]').should('be.visible').click();
        return this
    }
    
    verifyNgcsCore(){
        cy.get('#core-device-tab > li.-active > a').should('be.visible');
    }
    verifyNgcsCoreDevices(){
        cy.get('#core-device-tab > li:nth-child(2) > a').should('be.visible');
    }

    verifyTableHeaderWithApiNGCS(){
        var mtoken=Cypress.env('mytoken');
        cy.request({
          method: "get",
          followRedirect: false,
          log: true,
          url:
            "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/ngcs",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + mtoken,
          },
          response: [],
        }).then((response) => {
          assert.equal(response.status, 200);
          cy.log(response.body);
          expect(response.body).to.not.be.null;
          let ngcsCoreList = response.body.ngcsCoreList;
    
          ngcsCoreList.forEach((item) => {
            expect(item).to.have.all.keys(
                "ngcsCoreName",
                "ngcsCoreStatus",
                "callsRecived",
                "callsProgressed",
                "callsRoutedSuccessfully"
            );
          });
      });     
      }


    }
    export default NgcsPage