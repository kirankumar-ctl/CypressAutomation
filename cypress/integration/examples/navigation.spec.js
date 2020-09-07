///<reference types="cypress" />

describe('This is the first test', () => {
  before(() => {
    cy.fixture('getTokenBackdoor.json').then(json => {
      cy.request('PUT', json.url, {
        schema: json.schema,
        uid: json.uid,
        type: json.type,
      }).then(response => {
        const cookieValue = response.body.refresh_token;
        cy.visitWithMocks('https://nginx-master-po-ng911.kubeodc-test.corp.intranet/ng911/home', [
          {
            name: 'PSAPS',
            url: 'https://api-dev1.centurylink.com/DataServices/v1/PublicSafety/ng911/psaps',
            method: 'GET',
            responseFixture: 'fixture:psaps.json',
            status: 200,
            cookies: [{ name: 'token', value: cookieValue, domain: window.location.hostname }],
          }
         
        ]);
      });
    });
  });

  it ( 'should do what ever',() => {
    
      cy.get('body');
    });
});


