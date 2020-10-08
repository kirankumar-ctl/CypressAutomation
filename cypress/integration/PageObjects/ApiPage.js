///<reference types="cypress" />


class ApiPage {

  callApiForNG911() {
    cy.log(Url);
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url: "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/ingress",
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
    });
    return ingressCount
  }

}

export default ApiPage


