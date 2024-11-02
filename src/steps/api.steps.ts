import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { sendPostRequest, sendGetRequest } from '../support/api/apiHelper';

let response: any;

Given('I send a POST request to {string} with the following data', async function (endpoint: string, dataTable) {
  const data = dataTable.rowsHash();

  try {
    response = await sendPostRequest(endpoint, data);
  } catch (error) {
    throw new Error(`Failed to send POST request to ${endpoint}: ${error}`);
  }
});

Given('I send a GET request to {string}', async function (endpoint: string) {
  try {
    response = await sendGetRequest(endpoint);
  } catch (error) {
    throw new Error(`Failed to send GET request to ${endpoint}: ${error}`);
  }
});

Then('the response should contain {string} with value {string}', function (key: string, value: string) {
  // Adjust for the nested structure
  const expectedValue = isNaN(Number(value)) ? value : Number(value);

  // Check if the response has a `data` property and look inside it if necessary
  const actualValue = response.data && response.data[key] ? response.data[key] : response[key];
  expect(actualValue).toEqual(expectedValue);
});

Then('the response should contain {string} with a non-empty value', function (key: string) {
  // Check for nested structure and get the value accordingly
  const actualValue = response.data && response.data[key] ? response.data[key] : response[key];
  expect(actualValue).toBeDefined();
  expect(actualValue).not.toBe('');
});
