///<reference types="cypress" />

class NgcsPage{

    verifyAndClickNgcsTab()
    {
        cy.get('[aria-label="NGCS Card"]').should('be.visible').click();
        return this
    }
    
    verifyNgcsCore(){
        cy.get('#core-device-tab > li.-active > a').should('be.visible');
    }
    verifyNgcsCoreDevices(){
        cy.get('#core-device-tab > li:nth-child(2) > a').should('be.visible');
    }
    
    }
    
    export default NgcsPage