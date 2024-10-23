import { setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { fixture } from './pageFixture';

// Define a custom world interface that extends the CucumberWorld
export interface CustomWorld extends CucumberWorld {
    browser: Browser; // Browser instance for Playwright
    page: Page;       // Page instance for Playwright
    env: string;      // Environment variable to determine the execution context
}

// Create a custom world class that implements CustomWorld
class World extends CucumberWorld implements CustomWorld {
    browser!: Browser; // Declare browser variable, initialized later
    page!: Page;       // Declare page variable, initialized later
    env!: string;      // Declare env variable, initialized in the constructor

    // Constructor to initialize the world with options
    constructor(options: any) {
        super(options); // Call the parent class constructor
        this.env = process.env.ENV || 'default'; // Set environment variable, default to 'default'
    }

    // Initialize the browser and page for tests
    async init() {
        this.browser = await chromium.launch(); // Launch a new Chromium browser instance
        fixture.page = await this.browser.newPage(); // Create a new page and assign it to the fixture
        this.page = fixture.page; // Set the page for this instance
        console.log(`Running scenario in ${this.env} environment`); // Log the environment for debugging
    }

    // Cleanup resources after tests
    async cleanup() {
        await this.page.close(); // Close the current page
        await this.browser.close(); // Close the browser instance
    }
}

// Set the custom world constructor for Cucumber to use
setWorldConstructor(World);
