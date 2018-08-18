# 열려라 국회 크롤러 - 국회의원 발의 법안 목록 조회

[FTTO](https://ftto.kr)에서 [국회의원 감시하기](https://gookgam.com)를 개발하기 위해 사용한 크롤러 소스코드

## 순서

1. [국회의원 정보 크롤러](https://github.com/ftto/peoplepower-crawler-people)를 통해 수집한 의원명과 열려라국회 ID 를 활용하여 해당 의원의 법안 목록 URL 를 특정한다.

2. 특정한 URL 에서 지난 달에 발의된 법안을 골라 수집한다.

## Tips

- `src/config.js` 파일에서 크롤러가 동작하는 성능/속도와 관련된 설정을 수정할 수 있다. 너무 빠르게 동작하도록 설정했다가는 열려라 국회 쪽 사이트에 접근이 막힐 수 있으니 적절한 값으로 동작하는 것이 좋다.

## Test

```bash
node test/index.js
```

## Developed By

[FTTO](https://ftto.kr)

## License

[MIT](LICENSE)
