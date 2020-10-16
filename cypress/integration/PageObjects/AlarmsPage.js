///<reference types="cypress" />

class AlarmsPage {


  verifyAndClickAlarmsTab() {
    cy.get('div.chi-col:nth-child(4) > div:nth-child(1) > div:nth-child(1)').should('be.visible').click();
    return this
  }

  verifyDataTablePresentAlarms() {
    cy.get('.-fixed--header').should('be.visible');
    return this
  }

  verifyTableHeaderWithApi() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/ALARMS",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      cy.log(response.body);
      expect(response.body).to.not.be.null;
      let alarmLists = response.body.alarmLists;
      alarmLists.forEach((item) => {
        expect(item).to.have.all.keys(
          "alarmTimestamp",
          "device",
          "metric",
          "segment",
          "threshold",
          "type"
        );
      });
    });
  }

  verifyAlarmsCardDetails() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/ALARMS_xyz",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      //cy.log(response.body);
      expect(response.body).to.not.be.null;
      let alarmsCount = response.body.alarmCount;
      cy.get('div.chi-col:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)').contains('ALARMS');
      cy.log("ALARMS count-", alarmsCount);
      cy.get('div.chi-col:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)').contains(alarmsCount);

    });
  }


}

export default AlarmsPage