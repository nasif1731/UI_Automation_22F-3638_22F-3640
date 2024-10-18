const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
        'App Version': '0.1.0',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome',
        'Platform': 'Windows',
        'Parallel': 'Scenarios',
        'Executed': 'Remote'
    }
};

reporter.generate(options);
