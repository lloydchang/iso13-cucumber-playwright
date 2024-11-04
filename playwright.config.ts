// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Set global expect timeout to 10 seconds
    expect: {
        timeout: 10000, // 10 seconds
    },
    use: {
        headless: false, // Run in non-headless mode for easier debugging and recording
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true, // Ignore HTTPS errors for easier testing on dev environments

        // Set navigation and action timeouts
        navigationTimeout: 15000, // Set navigation timeout to 15 seconds
        actionTimeout: 10000, // Set action timeout to 10 seconds
    }
});
