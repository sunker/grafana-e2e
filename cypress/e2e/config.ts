import { Credentials } from '../../src/support/types';

export const credentials: Credentials = { user: 'admin', password: 'admin' };
export const datasource = {
  name: 'CloudWatch',
  type: 'cloudwatch',
  jsonData: {
    authType: 'keys',
    defaultRegion: 'us-east-2',
  },
  secureJsonData: {
    accessKey: 'AKIA5FW5RZWLZHRQKFAV',
    secretKey: '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',
  },
};
export const dashboard = {
  dashboardPath: 'redshift.json',
};
