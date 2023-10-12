import { resolveSelectorVersion } from '../../selectors/';
import { versionedComponents, versionedPages } from '../../selectors/versioned';
import { getSelectors } from '../../selectors/getSelectors';

Cypress.Commands.add('getRuntimeContext', () => {
  return cy.window().then((win) => {
    const { grafanaBootData } = win.window as any;
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
    return {
      grafanaVersion: settings.buildInfo.version,
      selectorFunctions,
      selectors,
    };
  });
});
