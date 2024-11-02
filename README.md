# cucumber-playwright

![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.x-brightgreen) ![npm Version](https://img.shields.io/badge/npm-%3E%3D%2010.x-blue) ![License](https://img.shields.io/github/license/iso13/cucumber-playwright)

This project uses Cucumber and Playwright for end-to-end testing.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Writing Tests](#writing-tests)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Additional Resources](#additional-resources)

## Prerequisites

- [Node.js (>= 20.x)](https://nodejs.org/)
- [npm (>= 10.x)](https://www.npmjs.com/)

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/iso13/cucumber-playwright.git
   cd cucumber-playwright
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Install Playwright browsers:**

   ```sh
   npx playwright install
   ```

## Running Tests

1. **Run all tests:**

   ```sh
   npm run cucumber
   ```

2. **Run a specific feature by tag:**

   ```sh
   npm run cucumber -- --tags "@tagName"
   ```

3. **Run tests in a specific browser (e.g., Chrome):**

   ```sh
   npx playwright test --project=chromium
   ```

## Project Structure

- `features/`: Contains the feature files written in Gherkin syntax.
- `steps/`: Contains the step definitions for the feature files.
- `support/`: Contains support files and hooks.


## Writing Tests

1. **Create a feature file in the `features/` directory:**

   ```gherkin
   Feature: Example feature

     Scenario: Example scenario
       Given I open the homepage
       Then I should see the title "Example Domain"
   ```

2. **Create step definitions in the `steps/` directory:**

   ```typescript
   import { Given, Then } from 'cucumber';
   import { expect } from '@playwright/test';

   Given('I open the homepage', async function () {
     await page.goto('https://example.com');
   });

   Then('I should see the title {string}', async function (title) {
     const pageTitle = await page.title();
     expect(pageTitle).toBe(title);
   });
   ```

## Examples

- **Run tests by tags:**
  
  ```sh
  npm run cucumber -- --tags "@tagName"
  ```

- **./reports/report.html**
  
  ```sh
  npm run cucumber:report
  ```

## Troubleshooting

- **Error: `npx playwright install` fails.**  
  Ensure that you are running a supported Node.js version (`>= 20.x`).

- **Tests are not running as expected.**  
  Make sure all dependencies are installed by running:
  
  ```sh
  npm install
  ```

## Contributing

Contributions are welcome! Please follow the [Contributing Guidelines](CONTRIBUTING.md) for submitting issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Additional Resources

- [Cucumber Documentation](https://cucumber.io/docs/guides/10-minute-tutorial/)
- [Playwright Documentation](https://playwright.dev/docs/intro)

