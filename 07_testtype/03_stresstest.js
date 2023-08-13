import http from 'k6/http';
import { Counter, Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';

// Define metrics
const requestCounter = new Counter('requests_counter');
const requestTrend = new Trend('requests_trend');
const successRate = new Rate('success_rate');

export const options = {
    stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load(200 VUs)
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point(300 VUs)
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
    ],
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

// Stress Testing
// To check stability and availability when and after getting massive loads

// Note: stresstest should ramp-up (not spike test)

// To run test
// k6 run 03_stresstest.js
