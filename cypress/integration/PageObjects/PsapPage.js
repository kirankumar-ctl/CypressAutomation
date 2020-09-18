///<reference types="cypress" />

class PsapPage{

validateListTab()
{
    cy.get(':nth-child(2) > a > .-ml--0').should('be.visible');
    return this
}

validateMapTab()
{
    cy.get('.-active > a > .-ml--0').should('be.visible');
    return this
}
verifyTableHeaderWithApiPSAP(){
    var mtoken=Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/psaps",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      //cy.log(response.body);
      expect(response.body).to.not.be.null;
      let psapsList = response.body.psaps;
      psapsList.forEach((item) => {
        expect(item).to.have.all.keys(
            "name",
            "id",
            "psapName",
            "status",
            "callsReceived",
            "callsMissed",
            "moSScore",
            "address",
            "circuits",
            "alerts"
        );
      });
  });     
  }

}
export default PsapPage