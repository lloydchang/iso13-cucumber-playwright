// Importing necessary functions and types from Cucumber, Playwright, axe-core, and other modules
import { Given, When, Then } from "@cucumber/cucumber";
import { Page } from "playwright";
import { AxeResults, Result } from "axe-core";
import { fixture } from "../support/pageFixture";
import { createHtmlReport } from "axe-html-reporter";
import { writeFileSync } from "fs";

// Function to inject the Axe accessibility testing library into the webpage
async function injectAxe(page: Page) {
  await page.addScriptTag({
    path: require.resolve("axe-core/axe.min.js"),  // Resolve the path to the minified Axe script
  });
}

// Function to run the Axe accessibility check and return the results
async function checka11y(page: Page): Promise<AxeResults> {
  return await page.evaluate(async () => {
    return await (window as any).axe.run();  // Run Axe's accessibility check on the page
  });
}

// Given step: Navigate to a specific accessible website
Given("I go to a site that is accessible", async function () {
  await this.page.goto("https://www.a11yproject.com/");  // Go to the accessibility project site
});

// When step: Inject Axe and prepare for accessibility checks
When("I run the a11y check", async function () {
  await injectAxe(this.page);  // Inject the Axe script for a11y checks
});

// Then step: Run accessibility check and handle/report violations
Then("I should not see violations", async function () {
  const results: AxeResults = await checka11y(this.page);  // Run the accessibility check and get results

  // Generate an HTML report for the accessibility results
  const reportHtml = createHtmlReport({
    results,
    options: {
      projectKey: "Accessibility Testing",  // Set a key for identifying the test project
    },
  });

  // Save the generated HTML report to the specified directory
  writeFileSync("reports/a11y-report.html", reportHtml);

  // Check for accessibility violations with a "serious" impact level
  if (results.violations.length > 0) {
    const seriousViolations: Result[] = results.violations.filter(
      (v) => v.impact === "serious"  // Filter to find serious violations
    );

    // If serious violations are found, throw an error with details
    if (seriousViolations.length > 0) {
      throw new Error(
        `A11y issues found: ${JSON.stringify(seriousViolations, null, 2)}`,  // Log serious violations
      );
    }
  }
});
