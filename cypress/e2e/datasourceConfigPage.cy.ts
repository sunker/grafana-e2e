import { credentials, dashboard, datasource } from './config';
const { parse: parseYml } = require('yaml');

type RedshiftDatasourceConfig = {
  secureJsonData: {
    accessKey: string;
    secretKey: string;
  };
  jsonData: {
    clusterIdentifier: string;
    database: string;
    dbUser: string;
    defaultRegion: string;
    managedSecret: {
      arn: string;
      name: string;
    };
  };
};
type RedshiftProvision = {
  datasources: RedshiftDatasourceConfig[];
};

describe('query editor', () => {
  beforeEach(() => {
    cy.loginViaAPI(credentials);
    cy.readProvisioningFile('provisioning/datasources/aws-redshift.yaml');
    cy.visitNewDataSourcePage('grafana-redshift-datasource');
  });

  it('should be possible to ', () => {
    cy.get('@provisioning').then((provisioning: any) => {
      const { secureJsonData, jsonData } = provisioning.datasources[0];
      cy.get('[data-test=]').type(secureJsonData.accessKey);
      cy.get('input[name=secretKey]').type(secureJsonData.secretKey);
      cy.get('input[name=clusterIdentifier]').type(jsonData.clusterIdentifier);
      cy.get('input[name=database]').type(jsonData.database);
      cy.get('input[name=dbUser]').type(jsonData.dbUser);
      cy.get('input[name=defaultRegion]').type(jsonData.defaultRegion);
      cy.get('input[name=managedSecret]').type(jsonData.managedSecret.name);
      cy.get('button[aria-label="Save & Test"]').click();
      cy.get('div[aria-label="Connection verified"]').should('be.visible');
    });
  });

  // it("should have an input with value temperature", () => {
  //   cy.get("@queryEditor")
  //     .get("input[value=temperature]")
  //     .scrollIntoView()
  //     .should("be.visible");
  // });
});
