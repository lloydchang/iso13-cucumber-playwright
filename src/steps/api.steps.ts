// Import necessary functions and types from Cucumber, Playwright, and custom API helper
import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { sendPostRequest, sendGetRequest } from "../support/api/apiHelper";

let response: any; // Variable to store the response from API requests

// Step definition for sending a POST request
Given(
  "I send a POST request to {string} with the following data",
  async function (endpoint: string, dataTable) {
    // Convert data table from feature file to a key-value object
    const data = dataTable.rowsHash();

    try {
      // Send POST request to the given endpoint with provided data
      response = await sendPostRequest(endpoint, data);
    } catch (error) {
      // If the request fails, throw an error with details
      throw new Error(`Failed to send POST request to ${endpoint}: ${error}`);
    }
  },
);

// Step definition for sending a GET request
Given("I send a GET request to {string}", async function (endpoint: string) {
  try {
    // Send GET request to the specified endpoint and store response
    response = await sendGetRequest(endpoint);
  } catch (error) {
    // Throw an error if the GET request fails
    throw new Error(`Failed to send GET request to ${endpoint}: ${error}`);
  }
});

// Step definition for checking the response contains a key with a specific value
Then(
  "the response should contain {string} with value {string}",
  function (key: string, value: string) {
    // Convert the value to a number if it’s numeric, otherwise keep as a string
    const expectedValue = isNaN(Number(value)) ? value : Number(value);

    // Access the actual value, checking for a nested `data` structure in the response
    const actualValue =
      response.data && response.data[key] ? response.data[key] : response[key];
    
    // Assert that the actual value matches the expected value
    expect(actualValue).toEqual(expectedValue);
  },
);

// Step definition for verifying the response contains a key with a non-empty value
Then(
  "the response should contain {string} with a non-empty value",
  function (key: string) {
    // Retrieve the actual value, handling potential nested `data` structure
    const actualValue =
      response.data && response.data[key] ? response.data[key] : response[key];
    
    // Check that the actual value is defined and not an empty string
    expect(actualValue).toBeDefined();
    expect(actualValue).not.toBe("");
  },
);
