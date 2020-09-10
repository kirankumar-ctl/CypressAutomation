///<reference types="cypress" />

class IngressPage{

    verifyAndClickIngressTab()
    {
        cy.get('[aria-label="INGRESS Card"]').should('be.visible').click();
        return this
    }
    verifyDataTablePresentIngress()
    {
        cy.get('#list-section > div > div > div > div > div:nth-child(2)').should('be.visible');
        return this
    }
    

    
    }
    
    export default IngressPage