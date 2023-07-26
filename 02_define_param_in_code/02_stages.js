import http from 'k6/http';
import { sleep } from 'k6';

// vas 1 to 20 in 30sec
// vas 20 to 10 in 90sec
// vas to 0 in 20sec
export let options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 },
    ],
};

export default function() {
    http.get('http://test.k6.io');
    sleep(1);
}

// To run test
// k6 run 02_stages.js
