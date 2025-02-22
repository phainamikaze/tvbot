const cypress = require("cypress");

cypress.run({
  headed: true,
  spec: "./cypress/e2e/spec.cy.js",
  browser: "chrome",
  config: {
    baseUrl: "https://ts100.x10.asia.travian.com",
  },
  env: {},
});
