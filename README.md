# k6

k6(LoadImpact) เป็น tool ช่วยทำ loadtest ถูกเขียนขึ้นมาด้วย Golang  
โดย k6 จะรับ script ภาษา JavaScript เข้าไปแล้ว convert ไปทำงานด้วย Golang  
ทำให้นักพัฒนาสามารถเขียน script loadtest ด้วยภาษา JavaScript (แต่ก็สามารถแทรก Golang เข้าไปใน script ได้ถ้าต้องการ)

## Installation

1. ~~nvm & node~~ (not required)

Install nvm see: https://github.com/nvm-sh/nvm

Install node (LTS)

``` sh
nvm ls-remote
nvm install v18.17.0
```

2. k6

``` sh
brew install k6
```

## References

- [k6 result output](https://k6.io/docs/get-started/results-output/)
- [k6 coding](https://k6.io/docs/get-started/running-k6/)
