describe('Home page is working', function() {
    before(function() {
        cy.request('PUT', 'https://beta-auth.enterprise.ctl.io/backdoor/token?env=env1', {
            schema: 'http://elasticbox.net/schemas/token-request',
            uid: '11915926',
            type: 'enterprise',
        }).then(response => {
            cy.setCookie('token', response.body.refresh_token, { domain: window.location.hostname });
            cy.visit('/ng911/home', { failOnStatusCode: false });
        });
    });

    it('Wait for profile', () => {
        cy.server();
        cy.route('/Enterprise/v1/Security/portalIdentity/profile').as('profile');
        cy.wait(10000);
    });

    it('Alarm Page', () => {
        cy.get('[aria-label="ALARMS Card"]').click();
        cy.get('.chi-table > thead > tr > :nth-child(2) > div').contains('Segment');
        cy.get('tr > :nth-child(3) > div').contains('Device');
        cy.wait(10000);
    });
});
