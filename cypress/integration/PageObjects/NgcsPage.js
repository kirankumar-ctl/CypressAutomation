///<reference types="cypress" />

class NgcsPage {

  verifyAndClickNgcsTab() {
    cy.get(':nth-child(2) > .chi-stat > .chi-stat__content').should('be.visible').click();
    return this
  }

  verifyNgcsCore() {
    cy.get('#core-device-tab > li:nth-child(1) > a:nth-child(1)').should('be.visible').and('have.text', 'NGCS Core');
    cy.log('Ngcs core tab is visible')
  }
  verifyNgcsCoreDevices() {
    cy.get('#core-device-tab > li:nth-child(3) > a:nth-child(1)').should('be.visible').and('have.text', 'Core Devices')
    cy.log('Ngcs core devices tab is visible')
  }

  verifyNgcsComponentStatus() {
    cy.get('#core-device-tab > li:nth-child(2) > a:nth-child(1)').should('be.visible').and('have.text', 'Component Status');
    cy.log('NGCS Component Status tab is visible')
  }

  verifyTableHeaderWithApiNGCS() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/NGCS",
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
  verifyNgcsCardDetails() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/NGCS",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      cy.log(response.body);
      expect(response.body).to.not.be.null;
      let ngcsCount = response.body.ngcsCount;
      let impactedCount = response.body.ngcsImpactedCount + ' Impacted';
      cy.get('div.chi-col:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').contains('NGCS');
      cy.log("NGCS count-", ngcsCount);
      cy.get('div.chi-col:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').contains(ngcsCount);
      cy.log("NGCS impacted-", impactedCount);
      cy.get('div.chi-col:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').contains(impactedCount);
    });
  }

}
export default NgcsPage