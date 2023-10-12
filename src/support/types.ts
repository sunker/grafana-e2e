import { Pages, Components, E2EFunctions } from '../selectors/types';

export interface DataSource {
  type: string;
  name: string;
  jsonData: Object;
  secureJsonData: Object;
}

export interface ImportDashboardRequest {
  fixturePath: string;
  folderUid?: string;
  message?: string;
}

export interface Credentials {
  user: string;
  password: string;
}

export interface RuntimeContext {
  grafanaVersion: string;
  selectors: {
    pages: Pages;
    components: Components;
  };
  selectorFunctions: {
    pages: E2EFunctions<Pages>;
    components: E2EFunctions<Components>;
  };
}
