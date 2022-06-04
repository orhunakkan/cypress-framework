const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "chjgqk",
  responseTimeout: 10000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  // reporter: "mochawesome",
  // reporterOptions: {
  //   reporterEnabled: "mochawesome",
  //   mochawesomeReporterOptions: {
  //     reportDir: "cypress/reports/mocha",
  //     quite: true,
  //     overwrite: false,
  //     html: false,
  //     json: true,
  //   },
  // },
  
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },

  env: {
    mockyBaseURL: "https://run.mocky.io/v3",
    mockyGETSuccess: "/85c337aa-d055-4e0a-b4d2-0ece25869c3c",
    mockyGETInvalid: "/d4373ba8-b5f1-4e96-b48f-63289298f787",
    mockyGETArray: "/8a17c1ce-8398-44b3-bd24-35619c40b74d",
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://the-internet.herokuapp.com/",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
