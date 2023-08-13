import http from 'k6/http';
import { sleep } from 'k6';

// Test configuration
export let options = {
    // config default params
    vus: 10,
    iterations: 100,
};

export default function() {
    http.get('http://test.k6.io');
    sleep(1);
}

/*

/// To run test: 10 virtual users, 10 requests per user --> all 100 requests

$ k6 run 01_options_vus10_iter100.js

*/
