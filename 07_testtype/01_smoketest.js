import http from 'k6/http';
import { Counter, Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';

// Define metrics
const requestCounter = new Counter('requests_counter');
const requestTrend = new Trend('requests_trend');
const successRate = new Rate('success_rate');

export const options = {
    vus: 1,
    duration: '1m',
    thresholds: {
        'http_req_duration': ['p(99)<1500'],
    }
};

export default function () {
    // Make an HTTP request
    const response = http.get('http://test.k6.io');

    // Increment the request counter
    requestCounter.add(1);

    // Add response time to trend
    requestTrend.add(response.timings.duration);

    // Record the success or failure of the request
    if (response.status === 200) {
        successRate.add(true);
    } else {
        successRate.add(false);
    }

    // Sleep for a while before making the next request
    // const sleepDuration = Math.random(); // Sleep for up to 1 second
    sleep(1);
}

// Smoke Testing
// To verify that the system and test code is still operating normally

// To run test
// k6 run 01_smoketest.js
