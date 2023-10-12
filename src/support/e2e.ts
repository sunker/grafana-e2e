// load the global Cypress types

import './commands/login';
import './commands/dashboard';
import './commands/datasource';
import './commands/provisioning';
import './commands/context';

import * as types from './types';
import { Dashboard } from '../objects/Dashboard';
export { getSelectors } from '../selectors/getSelectors';

declare global {
  namespace Cypress {
    interface Chainable {
      loginViaAPI(value?: types.Credentials): Chainable;
      importDashboard(
        dashboard: types.ImportDashboardRequest
      ): Chainable<Dashboard>;
      visitNewDataSourcePage(datasourceType: string): Chainable;
      // editPanel(dashboardUrl: string, panelTitle: string): Chainable<Panel>;
      editPanel(panelTitle: string): Chainable;
      addDataSource(value: types.DataSource): Chainable;
      createDashboard(): Chainable;
      addDashboardPanel(): Chainable;
      getQueryEditorRow(refId: string): Chainable;
      addNewDashboard(fixturePath: string): Chainable;
      visitDashboard(): Chainable;
      readProvisioningFile(filePaths: string): Chainable;
      getRuntimeContext(): Chainable<types.RuntimeContext>;
    }
  }
}
