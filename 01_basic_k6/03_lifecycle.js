
// 1. init code: Load local files, import modules, declare lifecycle functions
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.3/index.js";

// init context: global variables
const pi = 3.14
let radians = 7

// init context: define k6 options
export const options = {
    vus: 1,
    iteration: 1,
};

// 2. setup code: Set up data for processing, share data among VUs
export function setup() {
    console.log("setup> pi: " + pi + " radians: " + radians);

    var circumference = 2 * pi * radians;

    return circumference
}

// 3. VU code: Run the test function, usually default
export default function (circumference) {
    console.log("function> " + circumference)
}

// 4. teardown code: Process result of setup code, stop test environment
export function teardown(circumference) {
    console.log("teardown> " + circumference)
}

// (Optional) Additional lifecycle functions
export function handleSummary(data) {
    delete data.metrics["data_sent"];   // remove default metric: "data_sent"

    return {
        stdout: textSummary(data, { indent: "→", enableColors: true }),
    };
}

/*

$ k6 run 03_lifecycle.js

$ k6 run --no-setup --no-teardown 03_lifecycle.js

*/

// Reference 
// - https://k6.io/docs/using-k6/test-lifecycle/
