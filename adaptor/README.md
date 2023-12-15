# API 정의서
> api 호출 : /api/call
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
  "httpMethod": "string", // GET, POST, PUT, DELETE, PATCH 중 하나
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

> 여러 api 조합 : /api/combine
```
예정
```

> api 검증 (웹 소켓) : /api/perform/socket-connect
Request
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

Response
```
{
    "userId": "USER-6",
    "response": {
        "responseTime": 1687,
        "body": {
            "userId": 1,
            "id": 1,
            "title": "delectus aut autem",
            "completed": false
        },
        "status": "200 OK"
    }
}
```

# adaptor
> API TEST 자동화 Project

REST API 

# 기능

> API Call Test
- header, body
  - REST API를 위한 header, body를 세팅할 수 있다.
- HTTP Method
  - GET :
  - POST :
  - PUT :
  - DELETE :
- Authorization
  - d
- parameter
  - d
- 스케쥴링
  - Time주기
  - Count 호출 횟수
- ...*

> API Response Test
- Key가 있는지 확인
- Assertion Value값 확인
- Status에 따른 Pass
- Time - 시간안에 호출하는지 확인


> API 필드 결합(Combination)
- concat -> new key생성 -> key체크
- Insert -> key 체크

> API Performance Test
- 성능 테스트

![image](https://github.com/tmdrl5779/adaptor/assets/45285712/eb888c0c-2f4e-423c-a46b-7aa6a901cdc6)
![image](https://github.com/tmdrl5779/adaptor/assets/45285712/7732b24a-d3ae-48d9-94ae-3dc62f8bc4aa)


> 테스트는 한번에 실행되어야함 ex) 10개의 API를 쐈을때 한번에 실행
- Async
- NonBlocking
- WebClient
- Coroutine

> 테스트 조건 통과
- PASS

> 테스트 조건 실패
- FAIL -> 이유 확인
