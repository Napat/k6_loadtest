import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Gauge, Trend, Rate } from 'k6/metrics';

import { isHttpSuccess } from "../module/apiutil.js";

// Define metrics
const requestCounter = new Counter('requests_counter');
const responseTimeGauge = new Gauge('response_time_gauge');
const requestTrend = new Trend('requests_trend');
const successRate = new Rate('success_rate');

export default function () {
    // Make an HTTP request
    const startTime = new Date();
    const response = http.get('http://test.k6.io');
    const endTime = new Date();

    // Increment the request counter
    requestCounter.add(1);

    // Calculate and record response time
    const responseTime = endTime - startTime;
    responseTimeGauge.add(responseTime);

    // Add response time to trend
    requestTrend.add(responseTime);

    // Record the success or failure of the request
    if (isHttpSuccess(response)) {
        successRate.add(true);
    } else {
        successRate.add(false);
    }

    // Sleep for a while before making the next request
    const sleepDuration = Math.random(); // Sleep for up to 1 second
    console.log('sleepDuration: ' + sleepDuration);
    sleep(sleepDuration);
}

/*

$ k6 run 02_example_usage.js --vus 1

*/
