const { defineConfig } = require('cypress');
const readProvisions = require('./src/plugins/readProvisions');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      on('task', {
        readProvisions: (filePaths) =>
          readProvisions({ CWD: process.cwd(), filePaths }),
      });

      on('task', {
        log({ message, optional }) {
          optional ? console.log(message, optional) : console.log(message);
          return null;
        },
      });
    },
  },
});

// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   // setupNodeEvents can be defined in either
//   // the e2e or component configuration
//   e2e: {
//     setupNodeEvents(on, config) {
//       on('task', {
//         log(message) {
//           console.log(message);

//           return null;
//         },
//       });
//     },
//   },
// });
