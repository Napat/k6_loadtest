
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from "k6/metrics";
import { isHttpSuccess } from "../module/apiutil.js";

const RVusSuccessRate = new Rate("rvus_get_k6_page_main_success_rate");
const RVusTpsTotal = new Counter("rvus_get_k6_page_main_tps_total");
const RVusTpsSuccess = new Counter("rvus_get_k6_page_main_tps_success");

export let options = {
    thresholds: {
        http_req_duration: [{ threshold: "p(95)<1000", abortOnFail: true }],
    },
    scenarios: {
        // ramping-vus
        rvus_get_k6_page_main: {
            exec: "RVusGetK6MainPageMain",
            executor: "ramping-vus",
            startTime: '0s',
            startVUs: 10,
            stages: [
                { duration: "1m", target: 100 } // target is vus
            ],
            gracefulRampDown: "0s",
        },
        rvus_get_k6_page_news: {
            exec: "RVusGetK6PageNews",
            executor: "ramping-vus",
            startTime: '5s',
            startVUs: 1,
            stages: [
                { duration: "1m", target: 10 } // target is vus
            ],
            gracefulRampDown: "0s",
        },

        // ramping-arrival-rate
        rarate_get_k6_page_main: {
            exec: "RaRateGetK6MainPageMain",
            executor: "ramping-arrival-rate",
            startTime: '0s',
            startRate: 20,
            timeUnit: "5s",
            preAllocatedVUs: 50, // Allocated = max vus
            stages: [{ duration: "1m", target: 15 }], // target is arrival rate
        },
    },
};

export function setup() {
    // const urlHealthCheck = "http://localhost:4000/";
    // const res = http.get(urlHealthCheck);

    // if (!isHttpSuccess(res)) {
    //     throw new Error("status code is NOT 200");
    // }
}

export function RVusGetK6MainPageMain() {
    const res = http.get('http://test.k6.io');

    RVusTpsTotal.add(1);
    if (isHttpSuccess(res)) {
        RVusSuccessRate.add(true);
        RVusTpsSuccess.add(1);
    } else {
        RVusSuccessRate.add(false);
    }

    sleep(0.5);
}

export function RVusGetK6PageNews() {
    const res = http.get('http://test.k6.io/news.php');

    sleep(0.5);
}

export function RaRateGetK6MainPageMain() {
    const res = http.get('http://test.k6.io');

    sleep(0.5);
}

export function teardown() {
    console.log("Teardown...");
}

/*

$ k6 run 01_stages.js

*/
