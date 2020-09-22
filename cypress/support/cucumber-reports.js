

var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber-json',
        output: 'reports/html_simple/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"5.1.0 ",
            "Test Environment": "Env1",
            "Browser": "Electron 83",
            "Platform": "Windows 10",
            "Parallel": "NA",
            "Executed": "Local"
        }
    };

    reporter.generate(options);

  