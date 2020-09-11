///<reference types="cypress" />

class AlarmsPage{

    verifyAndClickAlarmsTab()
    {
        cy.get('[aria-label="ALARMS Card"]').should('be.visible').click();
        return this
    }
    
    verifyDataTablePresentAlarms()
    {
        cy.get('#list-section > div > div > div > div > div:nth-child(2)').should('be.visible');
        return this
    }

    verifyTableHeaderWithApi(){
        it("Api validate", () => {
            cy.request({
              method: "get",
              followRedirect: false,
              log: true,
              url:
                "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/alarms",
              headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
              },
              response: [],
            }).then((response) => {
              assert.equal(response.status, 200);
              cy.log(response.body);
              expect(response.body).to.not.be.null;
              let alarmLists = response.body.alarmLists;
        
              alarmLists.forEach((item) => {
                cy.log(item)
                cy.log('test api alrams')
                expect(item).to.have.all.keys(
                  "alarmTimestamp",
                  "device",
                  "metric",
                  "segment",
                  "threshold",
                  "type"
                );
              });
              function getRandomArbitrary(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
              }
        
              alarm = alarmLists[getRandomArbitrary(0, alarmLists.length)];
            });
          });
    }
    
    }
    
    export default AlarmsPage