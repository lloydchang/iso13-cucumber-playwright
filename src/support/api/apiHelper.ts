// apiHelper.ts
import axios, { AxiosError } from 'axios';
import { logger } from '../logger'; // Assuming you have a logger utility

const BASE_URL = 'https://reqres.in';

export async function sendPostRequest(
  endpoint: string,
   Record<string, unknown>
) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.error(`Error sending POST request to ${url}:`, axiosError.message);
    logger.error('Response ', axiosError.response?.data);
    logger.error('Response status:', axiosError.response?.status);
    throw new Error(`API request failed: ${axiosError.message}`); // Re-throw for Cucumber to catch
  }
}

export async function sendGetRequest(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.error(`Error sending GET request to ${url}:`, axiosError.message);
    logger.error('Response ', axiosError.response?.data);
    logger.error('Response status:', axiosError.response?.status);
    throw new Error(`API request failed: ${axiosError.message}`); // Re-throw for Cucumber to catch

  }
}
