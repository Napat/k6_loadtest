import http from 'k6/http';

export default function() {
    var body = JSON.stringify({
        email: 'aaa@example.com',
        password: 'topsecret',
    });
    var params = {
        headers: {
        'Content-Type': 'application/json',
        },
    };

    // ref: http://httpbin.org/#/HTTP_Methods/post_post
    const res = http.post('http://httpbin.org/post', body, params);
    console.log(res.body)
    console.log(res.status)
}


/* 

/// 1 virtual user call 1 request default output=stdout
$ k6 run 02_post.js

/// 1 virtual user iteration call 10 requests
$ k6 run --vus 1 --iterations 10 02_post.js

/// 10 virtual user iteration call 20 requests
/// --> 1 virtual user call 2 requests
$ k6 run --vus 10 --iterations 20 02_post.js

/// virtual user = 10 users
/// run duration = 30 seconds
$ k6 run --vus 10 --duration 30s 02_post.js

/// virtual user = 10 users 
/// and ramp up to 20 users in 30 seconds
$ k6 run --vus 10 --duration 30s --max 20 02_post.js

/// redirect output
$ k6 run \ 
    --out json=output.json \ 
    --summary-export=summary-export.json \ 
    02_post.js 

*/
