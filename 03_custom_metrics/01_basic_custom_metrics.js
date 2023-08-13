import { Counter, Gauge, Rate, Trend } from 'k6/metrics'
let counter = new Counter('my_counter')
let guage = new Gauge('my_guage')
let trend = new Trend('my_trend')
let rate = new Rate('my_rate')

export default () => {
    counter.add(1)
    counter.add(2)
    counter.add(3)
    counter.add(4)

    guage.add(10)
    guage.add(30)
    guage.add(20)

    trend.add(100)
    trend.add(200)
    trend.add(300)
    trend.add(400)

    rate.add(1)
    rate.add(1)
    rate.add(1)
    rate.add(0)
    rate.add(0)
}


/* 

Counter – counter
Gauge – keep latest value, and display min, max too
Trend – calculate statistic: avg, min, med, max, prop
Rate – หาอัตราส่วนของค่าที่ไม่ใช่ 0 หรือไม่ใช่ false

$ k6 run 01_basic_custom_metrics.js

*/
