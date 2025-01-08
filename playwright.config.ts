// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { environments } from './src/support/environments';

// Determine the baseURL based on the environment variable ENV, default to 'qa' if not provided

const envKey = process.env.ENV as keyof typeof environments ?? 'qa';

const baseURL = environments[envKey];

export default defineConfig({
  expect: {
    timeout: 10000, // 10 seconds
  },
  use: {
    baseURL, // Set the baseURL based on the environment
    headless: false, // Run in non-headless mode for easier debugging and recording
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // Ignore HTTPS errors for easier testing on dev environments

    // Set navigation and action timeouts
    navigationTimeout: 15000, // Set navigation timeout to 15 seconds
    actionTimeout: 10000, // Set action timeout to 10 seconds
  },
  reporter: 'html', // Use the built-in HTML reporter
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  workers: process.env.CI ? 1 : 4, // Adjust the number of workers based on your system
});

