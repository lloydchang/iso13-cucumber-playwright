// src/steps/example.steps.ts
import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { getBaseURL } from '../support/environments';

Given('I navigate to the home page', async function (this: CustomWorld) {
  const baseURL = getBaseURL();
  await this.page?.goto(baseURL);
  await this.page?.waitForTimeout(5000);
});