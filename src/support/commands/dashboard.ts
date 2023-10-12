import Panel from '../../objects/Panel';
import { ImportDashboardRequest, RuntimeContext } from '../types';

Cypress.Commands.add(
  'importDashboard',
  ({ fixturePath: dashboardPath }: ImportDashboardRequest) => {
    cy.getRuntimeContext().then((selectors) => {
      return cy.fixture(dashboardPath).then((dashboard) => {
        return cy
          .request({
            url: '/api/dashboards/import',
            method: 'POST',
            body: {
              dashboard: dashboard,
              overwrite: true,
              inputs: [],
              folderId: 0,
            },
            failOnStatusCode: true,
          })
          .then((response) => {
            // return new Dashboard(response.body);
            return response.body;
          })
          .as('dashboard')
          .then((dashboard: any) => {
            cy.visit(`${dashboard.importedUrl}`);
          });
      });
    });
  }
);

Cypress.Commands.add('visitDashboard', { prevSubject: true }, () => {
  cy.get('@dashboard').then((dashboard: any) => {
    return cy.visit(`${dashboard.importedUrl}`).debug();
  });
});

Cypress.Commands.add('createDashboard', () => {
  cy.getRuntimeContext().then(({ selectors }) => {
    cy.visit(selectors.pages.AddDashboard.url);
  });
});

Cypress.Commands.add(
  'editPanel',
  { prevSubject: true },
  (subject: Cypress.PrevSubject, panelTitle: string) => {
    cy.get('@dashboard').then((dashboard: any) => {
      cy.getRuntimeContext().then((ctx: RuntimeContext) => {
        return ctx.selectorFunctions.components.Panels.Panel.title(panelTitle)
          .closest('[data-panelid]')
          .invoke('attr', 'data-panelid')
          .should('not.be', undefined)
          .then((panelId) => {
            // const panel = new Panel(dashboardUrl, panelId ?? '');
            // return panel.visit().then(() => panel);
            // cy.visit(dashboard.importedUrl);
            cy.visit(`${dashboard.importedUrl}?editPanel=${panelId}`);
          });
      });
    });
  }
);

Cypress.Commands.add(
  'getQueryEditorRow',
  { prevSubject: true },
  (subject: any, refId: string) => {
    console.log('refId', subject);
    return cy
      .get(`[aria-label="Query editor row title ${refId}"]`)
      .closest('[aria-label="Query editor row"]')
      .scrollIntoView();
  }
);

// Cypress.Commands.add(
//   'editPanel',
//   (dashboardUrl: string, panelTitle: string) => {
//     cy.getRuntimeContext().then((ctx: RuntimeContext) => {
//       return ctx.selectorFunctions.components.Panels.Panel.title(panelTitle)
//         .closest('[data-panelid]')
//         .invoke('attr', 'data-panelid')
//         .should('not.be', undefined)
//         .then((panelId) => {
//           const panel = new Panel(dashboardUrl, panelId ?? '');
//           return panel.visit().then(() => panel);
//         });
//     });
//   }
// );
