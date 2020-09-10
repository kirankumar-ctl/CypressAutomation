///<reference types="cypress" />

import PsapPage from '../PageObjects/PsapPage.js'
import NgcsPage from '../PageObjects/NgcsPage.js'
import IngressPage from '../PageObjects/IngressPage.js'
import AlarmsPage from '../PageObjects/AlarmsPage.js'

const psapPage = new PsapPage()
const ngcsPage= new NgcsPage()
const ingressPage= new IngressPage()
const alarmsPage= new AlarmsPage()


describe('basic sanity for NG911 app', () => {

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

  it ( 'verify home page',() => {
      cy.get('body');
    });

  it ( 'verify PSAP pages',() => {
    //const pp= new PsapPage()
    cy.wait(5000)
    psapPage.validateListTab()
    cy.wait(1000)
    psapPage.validateMapTab()
    });

  it ( 'verify NGCS pages',() => {
      cy.wait(1000)
      ngcsPage.verifyAndClickNgcsTab()
      cy.wait(1000)
      ngcsPage.verifyNgcsCore()
      cy.wait(1000)
      ngcsPage.verifyNgcsCoreDevices()
      });
  it ( 'verify Ingress pages',() => {     
      cy.wait(1000)
      ingressPage.verifyAndClickIngressTab() 
      cy.wait(3000)
      ingressPage.verifyDataTablePresentIngress()
      });

  it ( 'verify Alarms pages',() => {    
      cy.wait(1000)
      alarmsPage.verifyAndClickAlarmsTab()
      cy.wait(3000)
      alarmsPage.verifyDataTablePresentAlarms()
      //cy.wait(2000)
      //alarmsPage.verifyTableHeaderWithApi()

      });

});


