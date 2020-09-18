///<reference types="cypress" />

import PsapPage from '../PageObjects/PsapPage.js'
import NgcsPage from '../PageObjects/NgcsPage.js'
import IngressPage from '../PageObjects/IngressPage.js'
import AlarmsPage from '../PageObjects/AlarmsPage.js'

describe('verify NG911 app', () => {
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
    const pp= new PsapPage()
    cy.wait(2000)
    pp.validateListTab()
    cy.wait(1000)
    pp.validateMapTab()
    });

  it ( 'verify NGCS pages',() => {
      const np= new NgcsPage()
      cy.wait(1000)
      np.verifyAndClickNgcsTab()
      cy.wait(1000)
      np.verifyNgcsCore()
      cy.wait(1000)
      np.verifyNgcsCoreDevices()
      });
  it ( 'verify Ingress pages',() => {
      const ip= new IngressPage()
      cy.wait(1000)
      ip.verifyAndClickIngressTab() 
      });

  it ( 'verify Alarms pages',() => {
      const ap= new AlarmsPage()
      cy.wait(1000)
      ap.verifyAndClickAlarmsTab()
      });

});


