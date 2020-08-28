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

    it.skip('The List Page', () => {
        cy.get('#example-horizontal-base > :nth-child(2) > a').contains('List');
        cy.get('#example-horizontal-base > :nth-child(2) > a').click();
        cy.get('.container-fluid > .chi-table > :nth-child(1) > table > thead > tr > :nth-child(1) > div').contains(
            'PSAP'
        );
        cy.wait(10000);
    });

    it.skip('The Map Page', () => {
        cy.get('#example-horizontal-base > :nth-child(1) > a').contains('Map');
        cy.get('#example-horizontal-base > :nth-child(1) > a').click();
        cy.wait(10000);
    });

    it.skip('The PSAP Card', () => {
        cy.get('#bottomDrawerLink > :nth-child(2) > .card-body').should('be.visible');
        cy.get('#bottomDrawerLink > :nth-child(2) > .card-body').click();
        cy.wait(10000);
        cy.get('.chi-drawer__header').should('be.visible');
        cy.wait(10000);
        cy.get('#example-horizontal-base > :nth-child(1) > a').click();
    });
});
