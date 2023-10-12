export class Dashboard {
  constructor(private dashboard: any) {}

  visit() {
    return cy.visit(`${this.dashboard.importedUrl}`);
  }

  addPanel() {}

  editPanel(panelTitle: string) {
    // cy.get(
    //   `[data-testid="data-testid Panel header ${panelTitle.trim()}"]`
    // ).click();
    // cy.get('[aria-label="Panel header item Edit"]').click();
    // cy.get('[aria-label="Query editor row"]').should('exist');
    // return new Panel();
    // return cy
    //   .get(`[data-testid="data-testid Panel header ${panelTitle.trim()}"]`)
    //   .closest('[data-panelid]')
    //   .invoke('attr', 'data-panelid')
    //   .should('not.be', undefined)
    //   .then((panelId) => {
    //     const panel = new Panel(this.dashboard, panelId ?? '');
    //     panel.visit().then(() => {
    //       return panel;
    //     });
    //   });
    // return cy.editPanel(this.dashboard.importedUrl, panelTitle);
  }
}
