import { v4 as uuidv4 } from 'uuid';
import { DataSource } from '../types';

Cypress.Commands.add('addDataSource', ({ type, name }: DataSource) => {
  cy.request({
    url: '/api/datasources',
    method: 'POST',
    body: {
      name: name,
      type: type,
      access: 'proxy',
      isDefault: false,
    },
    failOnStatusCode: false,
  });

  // load ds by name
  return cy
    .request({
      url: `/api/datasources/name/${name}`,
      method: 'GET',
      failOnStatusCode: false,
    })
    .then((response) => {
      // update ds and create and alias for it
      return cy
        .request({
          url: `/api/datasources/uid/${response.body.uid}`,
          method: 'PUT',
          body: response.body,
          failOnStatusCode: false,
        })
        .then((response) => {
          return response.body;
        })
        .as('datasource');
    });
});

Cypress.Commands.add('visitNewDataSourcePage', (datasourceType: string) => {
  return cy
    .request({
      url: `/api/datasources`,
      method: 'POST',
      body: {
        name: `${datasourceType}-${uuidv4()}`,
        type: datasourceType,
        access: 'proxy',
        isDefault: false,
      },
      failOnStatusCode: false,
    })
    .then((response) => {
      return cy.visit(
        `/connections/datasources/edit/${response.body.datasource.uid}`
      );
    });
});
