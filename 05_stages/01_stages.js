import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        // vas 1 to 20 in 30s
        { duration: '30s', target: 20 },
        // vas 20 to 10 in 10s
        { duration: '10s', target: 10 },
        // Stay at rest on 10 vus for 1m30s
        { duration: "1m30s", target: 10 },
        // Ramp-down from 10 to 0 vus for 5s
        { duration: '5s', target: 0 },
    ],
};

export default function() {
    http.get('http://test.k6.io');
    sleep(1);
}

// To run test
// k6 run 01_stages.js
