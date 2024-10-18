const { setDefaultTimeout } = require('@cucumber/cucumber');




// Configure Cucumber
module.exports = {
    default: {
        require: [
            'tests/step-definitions/*.steps.js', // Path to step definitions
        ],
        format: [
            'html:cucumber-report.html', // For default Cucumber HTML report
            'json:./cucumber-report.json', // JSON report output
          
        ],
        paths: ['tests/features/*.feature'], // Path to feature files
        // Set the output directory for Allure results
        outputDir: 'results',
    },
};
