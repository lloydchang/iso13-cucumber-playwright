import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { environments } from '../support/environments';
import { browser } from '@tensorflow/tfjs';

Given('I navigate to homepage', async function (this: CustomWorld) {
  const envKey = process.env.ENV as keyof typeof environments || 'qa';
  const baseURL = environments[envKey];
  //if (!baseURL) throw new Error('Invalid environment value');
  await this.page?.goto(baseURL); // Navigate to the base URL
  await this.page?.waitForTimeout(5000);
});