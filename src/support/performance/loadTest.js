// /src/support/performance/loadTest.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// Set the number of virtual users and duration dynamically using environment variables
const vus = __ENV.VUS ? parseInt(__ENV.VUS) : 1;
const duration = __ENV.DURATION ? __ENV.DURATION : '1s';

// Log the values for verification
console.log(`Running load test with ${vus} virtual users for ${duration}`);

// Export the options using the dynamically set VUS and DURATION, and add thresholds
export let options = {
  vus: vus,
  duration: duration,
  thresholds: {
    'http_req_duration': ['avg<200', 'p(95)<300'], // Set thresholds for average and 95th percentile response time
    'checks': ['rate>0.99'], // At least 99% of checks must pass
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');
  const resultCheck = check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000, // Existing check for each request
  });

  // Log check result to understand which check failed
  if (!resultCheck) {
    console.error(`One or more checks failed. Response status: ${res.status}, Response time: ${res.timings.duration}ms`);
  }

  sleep(1);
}

// Handle the summary to generate reports
export function handleSummary(data) {
  return {
    'reports/performance/loadTest.json': JSON.stringify(data, null, 2),
    'reports/performance/loadTest.html': htmlReport(data),
  };
}
