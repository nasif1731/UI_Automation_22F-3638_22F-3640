const { setDefaultTimeout } = require('@cucumber/cucumber');
const allure = require('allure-cucumberjs');

// Set Allure options
allure.setOptions({
    outputDir: 'allure-results', // Ensure this directory exists
});
setDefaultTimeout(60000); // Set timeout for each step

module.exports = {
    default: {
      require: ["tests/steps-definitions/*.steps.js","node_modules/allure-cucumberjs/dist/index.js"], // Path to step definitions
      format: ['html:cucumber-report.html',
      '@wdio/allure-reporter',
      'json:allure-results.json'
      ], // Output for report
      
      paths: ['tests/features/*.feature'], // Path to feature files
    },
  };
  