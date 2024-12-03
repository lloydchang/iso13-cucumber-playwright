import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { getBaseURL } from '../support/environments';

Given('I navigate to the home page', async function (this: CustomWorld) {
  const baseURL = getBaseURL(); // Get the base URL from environments

  if (!baseURL) {
    throw new Error('Base URL is undefined');
  }

  await this.page?.goto(baseURL); // Navigate to the base URL
  await this.page?.waitForTimeout(5000); // Optional wait for demo purposes
});