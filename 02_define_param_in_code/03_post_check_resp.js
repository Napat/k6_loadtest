import { check } from "k6";
import http from 'k6/http';

export default function() {
  // var url = 'http://test.loadimpact.com/login.php';
  var url = 'http://test.k6.io/login.php';
  var formdata = {
    login: 'admin',
    password: '123',
  };
  var params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirects: 1
  };
  let res = http.post(url, formdata, params);
  let jar = http.cookieJar();
  let cookies = jar.cookiesForURL(url);


  // check http status code = 200
  // check has cookie name: sid
  // check has cookie name: uid
  // check cookie value
  check(res, {
    "is status 200": r => r.status === 200,         
    "has cookie 'sid'": (r) => cookies.sid.length > 0,
    "has cookie 'uid'": (r) => cookies.uid.length > 0,
    "cookie 'sid' has correct value": (r) => cookies.sid == "39b77ac6-39c4-4c43-98b3-6b2816682036",
    "cookie 'uid' has correct value": (r) => cookies.uid == "3221"
  });
}

// To run test

// 1 virtual users, 1 request
// k6 run 03_post_check_resp.js

// 10 virtual users, 10 requests per user --> all = 100 requests
// k6 run --vus 10 --iterations 100 k6-script-http.js
