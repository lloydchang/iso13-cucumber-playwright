// cucumber.mjs

import isCI from "is-ci"; // Import the is-ci module to check if the code is running in a CI environment

// Cucumber configuration
const config = {
    paths: [process.env.FEATURE_PATH || 'src/features/**/*.feature'], // Use environment variable for flexibility
    requireModule: ['ts-node/register'], // Enables TypeScript support for test files
    require: [
        process.env.STEP_PATH || 'src/steps/**/*.steps.ts', // Use environment variable for path
        'src/support/*.ts', // Load support files
    ],
    strict: true, // Ensure that all steps used in feature files are defined
    format: [
        'progress', // Shows test execution progress in the console
        'json:reports/cucumber_report.json', // Generates a JSON report of the test results
        'html:reports/report.html', //Generates an HTML report of the test results
    ],
    formatOptions: { snippetInterface: 'async-await' }, // Use async/await for step definitions
    worldParameters: {}, // Optional parameters to share across steps
    retry: isCI ? 1 : 0, // Retry failed tests once if running in a CI environment
};

// Export the configuration object as the default export
export default config;
