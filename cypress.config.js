const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});