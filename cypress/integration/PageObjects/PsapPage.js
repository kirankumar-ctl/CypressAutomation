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

}

export default PsapPage