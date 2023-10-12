const { parse: parseYml } = require('yaml');

Cypress.Commands.add('readProvisioningFile', (filePath: string) => {
  return cy
    .fixture(filePath)
    .then((contents) => parseYml(contents))
    .as('provisioning');
});
