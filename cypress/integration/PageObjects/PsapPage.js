///<reference types="cypress" />

class PsapPage {

  validateListTab() {
    const statTime = Cypress.moment().format('HH:MM:SS')
    cy.log('start time--', statTime);

    cy.get(':nth-child(2) > a > .-ml--0').should('be.visible').and('have.text', 'List');
    return this
  }

  validateMapTab() {
    cy.get('.-active > a > .-ml--0').should('be.visible').and('have.text', 'Map');
    return this
  }

  getPsapIdsFromServiceMap(){
    //cy.get('div.chi-popover:nth-child(6) > div:nth-child(1) > div:nth-child(1)').click({force: true})
    cy.get('div.chi-popover',{timeout:60000}).each(($el, index, $list) => {
        index=index+1;
      cy.log(index +'--  '+ $el.text())
       if($el.text().includes('1 ')){
        cy.wait(2000)
        
        const loc="div.chi-popover:nth-child("+ index +") > div[class='chi-popover__arrow']"
        cy.log(loc);
        cy.get(loc).invoke('show')
        cy.wait(5000)
        cy.get(loc).click('left',{force: true});
      
       //cy.contains($el.text()).dblclick('center',{force: true})
       
        //cy.wait(2000)
        //cy.get('button.chi-button:nth-child(3) > div:nth-child(1) > i',{timeout:60000}).click()
         //$el.click({force: true});
         cy.log('clicked')
       }
     
    })
  }

  getAppLogOutTime(mTimeOut) {
    var flag = true;
    var time = 0;
    var maxTimeout = mTimeOut;
    cy.log('maxTimeOut--' + maxTimeout);

    while (flag == true) {
      if (cy.get('.-active > a > .-ml--0').should('be.visible')) {
        flag = true
        if (time == maxTimeout) {
          break
        }
      }
      else {
        flag = false
      }
      cy.log('total login time is-- ' + time + ' min');
      cy.writeFile('cypress/fixtures/ng911LogOutTime.txt', 'total login time is-- ' + time + ' min');
      cy.wait(60000)
      time = time + 1
    }
  }

  verifyTableHeaderWithApiPSAP() {
    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/PSAP",
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

  verifyPsapCardDetails() {

    var mtoken = Cypress.env('mytoken');
    cy.request({
      method: "get",
      followRedirect: false,
      log: true,
      url:
        "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/refresh/PSAP",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + mtoken,
      },
      response: [],
    }).then((response) => {
      assert.equal(response.status, 200);
      cy.log(response.body);
      expect(response.body).to.not.be.null;
      let psapCount = response.body.psapCount;
      let impactedCount = response.body.psapImpactedCount + ' Impacted';
      cy.get('.-card--active > .card-body > .card-subtitle').contains('PSAP');
      cy.log("PSAP count-", psapCount);
      cy.get('.-card--active > .card-body > .card-title').contains(psapCount);
      cy.log("PSAP impacted-", impactedCount);
      cy.get('.-card--active > .card-body > .card-text').contains(impactedCount);
    });
  }



}
export default PsapPage

