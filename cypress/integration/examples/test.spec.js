///<reference types="cypress" />

describe("This is the first test", () => {
    var token = null;
    var alarm = null;
    before(() => {
      cy.fixture("getTokenBackdoor.json").then((json) => {
        cy.request("PUT", json.url, {
          schema: json.schema,
          uid: json.uid,
          type: json.type,
        }).then((response) => {
          token = response.body.access_token;
          const cookieValue = response.body.refresh_token;
          cy.visitWithMocks(
            "https://nginx-master-po-ng911.kubeodc-test.corp.intranet/ng911/home",
            [
              {
                name: "PSAPS",
                url:
                  "https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/psaps",
                method: "GET",
                responseFixture: "fixture:psaps.json",
                status: 200,
                cookies: [
                  {
                    name: "token",
                    value: cookieValue,
                    domain: window.location.hostname,
                  },
                ],
              },
            ]
          );
        });
        cy.log('out method token---',token)
      });
      cy.log('fixtures method token---',token)
    });
  
    it("Waiting for login", () => {
      //cy.viewport('macbook-11');
      cy.server();
      cy.route("/Enterprise/v1/Security/portalIdentity/profile").as("profile");
      cy.wait(20000);
    });
  
    it("The Alarms Card click", () => {
      cy.get(".card-deck .card:nth-child(4)").click();
      cy.log('alaram card click method token---',token)
    });
  
   // it("Get token", () => {
   //   cy.log(token);
   // });
  
    it("Api validate", () => {
      cy.log('api method token---',token)
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
  
    it("Click for sorting", () => {
      cy.wait(2000);
      //cy.viewport('macbook-11');
      cy.get(".chi-table").contains("Time").click();
      cy.wait(2000);
      cy.contains("Segment").click();
      cy.wait(2000);
      cy.contains("Device").click();
      cy.wait(2000);
      cy.contains("Type").click();
      cy.wait(2000);
      cy.contains("Metric").click();
      cy.wait(2000);
      cy.contains("Threshold").click();
    });
  
    it("Enter into search field", () => {
      cy.get(".chi-input").type(alarm.metric).should("have.value", alarm.metric);
    });
  });