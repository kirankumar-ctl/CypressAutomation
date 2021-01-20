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
  verifyNgcsCoreFunctions() {
    cy.get('#core-device-tab > li:nth-child(3) > a:nth-child(1)').should('be.visible').and('have.text', 'Core Functions')
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
      cy.get(':nth-child(2) > .-center > .chi-stat__content > #content-div-regular > .chi-stat-metric > .chi-stat-metric__title').contains('NGCS');
      cy.log("NGCS count-", ngcsCount);
      cy.get(':nth-child(2) > .-center > .chi-stat__content > #content-div-regular > .chi-stat-metric > div.chi-stat-metric__value').contains(ngcsCount);
      cy.log("NGCS impacted-", impactedCount);
      cy.get(':nth-child(2) > .-center > .chi-stat__content > #content-div-regular > div.chi-stat-submetric').contains(impactedCount);
    });
  }

}
export default NgcsPage