import { v4 as uuidv4 } from 'uuid';

export class DataSorceConfigPage {
  constructor(private type: string) {}

  visit() {
    return cy
      .request({
        url: `/api/datasources`,
        method: 'POST',
        body: {
          name: `${this.type}-${uuidv4()}`,
          type: this.type,
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
  }

  clickSaveAndTest() {
    cy.get('button[aria-label="Save & Test"]').click();
  }
}
