import http from 'k6/http';
import { check } from "k6";
import { Rate, Counter } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.3/index.js";

import { isHttpSuccess } from "../module/apiutil.js";

const urlpin = "https://api-list-dev.th-service.co.in/pr/pin"
const uuid = "f3b2ce1a487bc887474e85927fa4bcca4f3f2ab2e9ef530b31f484447f1e6526"
const pin = "123456"

const urlloadtest = "https://api-list-dev.th-service.co.in/pr/profile?mode=normal"

const successRate = new Rate("success_rate");
const tpsTotal = new Counter("tps_total");
const tpsSuccess = new Counter("tps_success");

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Simulate 10 virtual users for 1 minute
    ],
};


export function setup() {
    const urlPinToken = urlpin;
    const headers = { "Content-Type": "application/json" };
    const payload = JSON.stringify({
        uuid: uuid,
        pin: pin,
    });

    const res = http.post(urlPinToken, { 
            headers: headers,
            body: payload,
        },
    );

    if (!isHttpSuccess(res)) {
        throw new Error("status code is NOT 200");
    }

    const authToken = res.json().data.access_token;
    if (!check(authToken, { 
            "logged in successfully": () => authToken !== "" },
    )) {
            throw new Error("token is null");
    }
    return authToken;   // pass token to next cycle fn handler
}

// get token from setup via argument
export default function loadtest(authToken) {

    const urlGetProfile = urlloadtest;
    const headers = { Authorization: `Bearer ${authToken}` };

    const res = http.get(urlGetProfile, { headers });

    tpsTotal.add(1);
    if (isHttpSuccess(res)) {
        successRate.add(1);
        tpsSuccess.add(1);
    } else {
        successRate.add(0);
    }
}

export function teardown(authToken) {
    console.log("Teardown..." + authToken);
}

export function handleSummary(data) {
    delete data.metrics["http_reqs"];
    delete data.metrics["http_req_failed"];
    delete data.metrics["http_req_duration{expected_response:true}"];
    delete data.metrics["http_req_tls_handshaking"];
    delete data.metrics["http_req_blocked"];
    delete data.metrics["http_req_connecting"];
    delete data.metrics["http_req_receiving"];
    delete data.metrics["http_req_sending"];
    delete data.metrics["http_req_waiting"];

    return {
        stdout: textSummary(data, { indent: "→", enableColors: true }),
    };
}