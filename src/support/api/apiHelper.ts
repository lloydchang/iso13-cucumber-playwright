// /src/support/api/apiHelper.ts
// Import axios for making HTTP requests
import axios from "axios";

// Define the base URL for the API
const BASE_URL = "https://reqres.in";

// Function to send a POST request to a specified endpoint with given data
export async function sendPostRequest(
  endpoint: string,
  data: Record<string, any>,
) {
  // Construct the full URL by appending the endpoint to the base URL
  const url = `${BASE_URL}${endpoint}`;

  // Send a POST request with the provided data and await the response
  const response = await axios.post(url, data);

  // Return only the data portion of the response
  return response.data;
}

// Function to send a GET request to a specified endpoint
export async function sendGetRequest(endpoint: string) {
  // Construct the full URL by appending the endpoint to the base URL
  const url = `${BASE_URL}${endpoint}`;

  // Send a GET request and await the response
  const response = await axios.get(url);

  // Return only the data portion of the response
  return response.data;
}
