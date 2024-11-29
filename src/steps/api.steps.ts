// api.steps.ts
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { sendPostRequest, sendGetRequest } from '../support/api/apiHelper';

interface ApiResponse {
  data: Record<string, unknown>; // Define the structure of your API response data
  [key: string]: unknown; // Allow additional keys if needed
}

let response: ApiResponse;

Given('I send a POST request to {string} with the following data', async function (endpoint: string, dataTable: any) {
  const data: Record<string, string> = dataTable.rowsHash(); // Type `data` to avoid `any`
  try {
    response = await sendPostRequest(endpoint, data) as ApiResponse;
  } catch (error) {
    throw new Error(`Failed to send POST request to ${endpoint}: ${error}`);
  }
});

Given('I send a GET request to {string}', async function (endpoint: string) {
  try {
    response = await sendGetRequest(endpoint) as ApiResponse;
  } catch (error) {
    throw new Error(`Failed to send GET request to ${endpoint}: ${error}`);
  }
});

Then('the response should contain {string} with value {string}', function (key: string, value: string) {
  const expectedValue = isNaN(Number(value)) ? value : Number(value);
  const actualValue = response.data && response.data[key as keyof typeof response.data];
  expect(actualValue).toEqual(expectedValue);
});

Then('the response should contain {string} with a non-empty value', function (key: string) {
  const actualValue = response.data && response.data[key as keyof typeof response.data];
  expect(actualValue).toBeDefined();
  expect(actualValue).not.toBe('');
});
