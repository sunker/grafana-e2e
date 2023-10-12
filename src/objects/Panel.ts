export class Panel {
  constructor(private dashboardUrl: any, private panelId: string) {}

  visit() {
    return cy.visit(`${this.dashboardUrl}?editPanel=${this.panelId}`);
  }

  getQueryEditorRow(refId: string) {
    return cy
      .get(`[aria-label="Query editor row title ${refId}"]`)
      .closest('[aria-label="Query editor row"]')
      .scrollIntoView();
  }

  addQueryEditorRow() {
    return cy.get('[aria-label="Query editor row"]').then((elements) => {
      const count = elements.length;
      cy.get('[aria-label="Query editor add query button"]').click();
      cy.get('[aria-label="Query editor row"]').should(
        'have.length',
        count + 1
      );
      return cy.get('[aria-label="Query editor row"]').last();
    });
  }
}

export default Panel;
