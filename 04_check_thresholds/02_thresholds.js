import http from 'k6/http';
import { Counter, Trend, Rate } from 'k6/metrics';
import { sleep } from 'k6';

// Define metrics
const requestCounter = new Counter('requests_counter');
const requestTrend = new Trend('requests_trend');
const successRate = new Rate('success_rate');

export const options = {
    vus: 1,
    // duration: '10s',    // use 10s to pass 'requests_counter' thresholds 
    duration: '2s',    // use 2s to error thresholds 'requests_counter' 
    thresholds: {
        'http_req_duration': ['p(95)<500'],  // 95% of response times should be below 500ms
        'success_rate': ['rate>0.95'],       // Success rate should be above 95%
        'requests_counter': ['count>3'],   // At least 3 requests should be made
    },
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

/*

/// To run test
$ k6 run 02_thresholds.js

*/
