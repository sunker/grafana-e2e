/// <reference types="cypress" />

import { resolveSelectorVersion } from '../../selectors/';
import { versionedComponents, versionedPages } from '../../selectors/versioned';
import { getSelectors } from '../../selectors/getSelectors';
import { Credentials } from '../types';

// const selectors = getSelectors({ selectors: Components });

export const defaultCredentials: Credentials = {
  user: 'admin',
  password: 'admin',
};

Cypress.Commands.add(
  'loginViaAPI',
  (credentials: Credentials = defaultCredentials) => {
    cy.request({
      url: '/login',
      method: 'POST',
      body: credentials,
      failOnStatusCode: false,
    }).should('have.property', 'status', 200);

    return cy.visit('').then(detectGrafanaVersion);
  }
);

function detectGrafanaVersion($window: any) {
  const { grafanaBootData } = $window;
  const { settings } = grafanaBootData;
  // compile selector version
  // run selector factory func and attach to cy
  const selectors = resolveSelectorVersion(
    { components: versionedComponents, pages: versionedPages },
    settings.buildInfo.version
  );
  // selectors.
  const selectorFunctions = getSelectors({
    selectors,
  });
  cy.wrap(settings.buildInfo.version).as('version');
  cy.wrap({ selectorFunctions, selectors }).as('selectors');
}
