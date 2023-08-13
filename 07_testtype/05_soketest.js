import http from 'k6/http';
import { Counter, Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';

// Define metrics
const requestCounter = new Counter('requests_counter');
const requestTrend = new Trend('requests_trend');
const successRate = new Rate('success_rate');

export const options = {
    stages: [
        { duration: "4m", target: 400 }, // ramp up to 400 users
        { duration: "3h56m", target: 400 }, // stay at 400 for ~4 hours
        { duration: "4m", target: 0 }, // scale down. (optional)
    ]
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

// Soke Testing
// Run the test for a long period to look for any race situation, memory, 
// storage or bugs that might appear during the load run.
// Note: This test should run at 80% of normal load (500vus then run at 400vus)

// To run test
// k6 run 05_soketest.js
