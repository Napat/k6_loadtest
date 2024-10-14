---
runme:
  document:
    relativePath: README.md
  session:
    id: 01JA49QEN2YXJ9GTYZGA0YZ293
    updated: 2024-10-14 09:06:27+07:00
---

# k6 cloud

Ref: https://grafana.com/orgs/roona/performance-testing/738304

Create token from https://roona.grafana.net/a/k6-app/settings

```sh {"id":"01JA4BKF5V4QSMZWJ6ANYQKXP7"}
k6 login cloud -t <token>
```

Run test

```sh {"id":"01JA4BKF5V4QSMZWJ6AQ78P5GA"}
k6 cloud script.js

# Ran on 2024-10-14 08:59:14+07:00 for 6m 5.767s exited with 0

          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: cloud
     script: script.js
     output: https://roona.grafana.net/a/k6-app/runs/3363492

  scenarios: (100.00%) 1 scenario, 20 max VUs, 5m30s max duration (incl. graceful stop):
           * default: Up to 20 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0012] The options.ext.loadimpact option is deprecated, please use options.cloud instead  detected_level=warning instance_id=0 lz="amazon:us:columbus" service_name=unknown_service test_run_id=3363492

Run    [======================================] Finished
     test status: Finished

```
