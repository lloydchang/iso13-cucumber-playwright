// Import Cucumber hooks and utilities for managing test setup and teardown
import {
    After,
    AfterAll,
    Before,
    BeforeAll,
    setDefaultTimeout,
    Status,
  } from "@cucumber/cucumber";
  import { chromium, Browser, BrowserContext, Page } from "playwright";
  import { fixture } from "./pageFixture";
  import { CustomWorld } from "./world";
  
  let browser: Browser; // Variable to store the browser instance
  let context: BrowserContext; // Variable to store the browser context
  
  // Set the default timeout for steps to 10 seconds
  setDefaultTimeout(10 * 1000);
  
  // BeforeAll hook: Launch the browser before any tests run
  BeforeAll(async function () {
    browser = await chromium.launch({ headless: false }); // Launch Chromium browser in non-headless mode
  });
  
  // Before hook: Set up a new browser context and page before each scenario
  Before(async function (this: CustomWorld) {
    context = await browser.newContext(); // Create a new browser context (isolates cookies, storage, etc.)
    const page: Page = await context.newPage(); // Open a new page within the context
    fixture.page = page; // Assign the page to the fixture for global access
    this.page = page; // Assign the page to the Cucumber world for scenario-specific access
  });
  
  // After hook: Take a screenshot if a scenario fails
  After(async function ({ pickle, result }) {
    if (result?.status == Status.FAILED) {
      // Take a screenshot of the failed page and save it with the scenario name
      const img = await fixture.page.screenshot({
        path: `./reports/screenshots/${pickle.name}.png`,
        type: "png",
      });
      this.attach(img, "image/png"); // Attach the screenshot to the Cucumber report
    }
  });
  
  // AfterAll hook: Close the browser after all tests have completed
  AfterAll(async function () {
    if (browser) {
      await browser.close(); // Close the browser instance to free resources
    }
  });
  