
let token = null;
let ingCount=null;


const defaultMockedCall = {
    name: '',
    url: '',
    method: 'GET',
    responseFixture: 'fixture:responses/empty',
    status: 200,
    cookies: [],
  };

  Cypress.Commands.add('visitWithMocks', (url, mockedCalls) => {
    cy.server();
    (mockedCalls || []).forEach(mock => {
      const mockedCall = { ...defaultMockedCall, ...mock };
      (mock.cookies || []).forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain || window.location.hostname,
        });
      });
      console.log(mockedCall);
      cy.route({
        method: mockedCall.method,
        url: mockedCall.url,
        response: mockedCall.responseFixture,
        status: mockedCall.status,
      }).as(mockedCall.name);
    });
    cy.visit(url);
  });

  Cypress.Commands.add('loginNg911',() =>{
    cy.fixture('getTokenBackdoor.json').then(json => {
      cy.request('PUT', json.url, {
        schema: json.schema,
        uid: json.uid,
        type: json.type,
      }).then(response => {
        token = response.body.access_token;
        Cypress.env('mytoken', token);
        const cookieValue = response.body.refresh_token;
        cy.visitWithMocks('https://nginx-master-po-ng911.kubeodc-test.corp.intranet/ng911/home', [
          {
            name: 'HOME',
            url: 'https://nginx-master-po-ng911.kubeodc-test.corp.intranet/ng911/home',
            method: 'GET',
            //responseFixture: 'fixture:psaps.json',
            status: 200,
            cookies: [{ name: 'token', value: cookieValue, domain: window.location.hostname }],
          }
        ]);
      });
    });
  });
