import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { environments } from '../support/environments';

Given('I navigate to homepage', async function (this: CustomWorld) {
  const baseURL = environments[envKey];
  await this.page?.goto(baseURL); // Navigate to the base URL
  await this.page?.waitForTimeout(5000);
});