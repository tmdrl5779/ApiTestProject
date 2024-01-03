## 구상

### 레이아웃

라우터대신 퍼널 사용해서 간단하게 (토스 slash23 참고)
![image-20230614234956754](README.assets/image-20230614234956754.png)

![image-20230614235105261](README.assets/image-20230614235105261.png)



API 검증 화면

![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/9baa6281-a860-4b46-bde1-91291d1e7050)
![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/78a66625-befa-45f6-92fe-198dd98ef304)




### API Call 규격 : /api/call

Request

```
{
  "time": {
    "connectionTime": 0,
    "readTime": 0,
    "writeTime": 0
  },
  "count": 0, // 호출 횟수, 기본 1
  "url": "string",
  "httpMethod": "string", // get, post, put, delete, patch 중 하나
  "param": {
    "param1": "string",
    "param2": "string",
    ...
  },
  "header": {
    "header1": "string",
    "header2": "string",
    ...
  },
  "body": {
    ...
  }
}
```

Response

```
[
  {
    "responseTime": 0, //응답 시간
    "body": {}, //응답값 body
    "status": "string" // 200, 500 등의 상태 코드
  },
  ... //Request의 count횟수 만큼 list에 담아서 전달
]
```


### API 검증 규격 (웹 소켓) : /api/perform/socket-connect
- Request
```
{
    "userCount": 10,
    "repeatCount": 1,
    "interval" : 0,
    "requestDataList" : {
        "performType" : "CONCUR",
        "requestList" : [
            {
                "time": {},
                "count": 1,
                "url" : "https://jsonplaceholder.typicode.com/todos/1",
                "httpMethod" : "GET",
                "param" : {},
                "header" : {},
                "body" : {}
            }
        ]
    }
}
```

- Response
```
{  
    "responseList": [{
        "responseTime": 1687,
        "body": {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        "status": "200 OK"
    }],
    "totalTime" : 10,
    "result" : true,
    "userId": "USER-6"
}
```


### 컴포넌트 기반 개발

- TDD로 진행
  - 스토리북, jest, rtl 활용 테스트
  - emotion, framer, scss로 애니메이션과 스타일링
  - atomic, compound 패턴 활용

### 전역 상태관리

- recoil만 사용?

### 에러처리

- ErrorBoundary, Suspense 활용하기

### 할 일

- API 페이지 prop drilling 해결 

- Suspense + Error Boundary 넣어서 선언적으로 컴포넌트 만들기

- 스토리북 도입

- 성능 테스트 페이지 들어가기

  
