import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
    http.get('http://test.k6.io');
    sleep(1);
}

/* 

/// 1 virtual user call 1 request
$ k6 run 01_get.js

/// 1 virtual user iteration call 100 requests
$ k6 run --vus 1 --iterations 100 01_get.js

/// 10 virtual user iteration call 100 requests
/// --> 1 virtual user call 10 requests
$ k6 run --vus 10 --iterations 100 01_get.js

/// virtual user = 10 users
/// run duration = 30 seconds
$ k6 run --vus 10 --duration 30s 01_get.js

/// virtual user = 10 users 
/// and ramp up to 20 users in 30 seconds
$ k6 run --vus 10 --duration 30s --max 20 01_get.js

*/
