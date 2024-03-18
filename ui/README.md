## 구상

### 레이아웃

라우터대신 퍼널 사용해서 간단하게 (토스 slash23 참고)
![image-20230614234956754](README.assets/image-20230614234956754.png)

![image-20230614235105261](README.assets/image-20230614235105261.png)

API 검증 화면

- API 여러개 추가 가능한이유? 한 User가 여러개의 API를 호출할 수 있게 테스트를 하기 위함 (동시에 호출, 순차적 호출)
- 쓰레드란? User
- ex) 쓰레드 2, 반복횟수 2, 인터벌 30초
  1. User 2명이 동시에 설정한 API 를 호출함
  2. 이때 동시성 활성화 > 설정한 API가 어려개면 User는 API를 동시에 호출
  3. 이때 동시성 비활성화 > 설정한 API가 어려개면 User는 API를 순차적에 호출
  4. User 2명의 호출이 다 완료되면 인터벌 시간만큼 대기
  5. 반복 횟수 만큼 1~4번 반복

![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/3ec20a2b-3eb1-453d-9c29-2deae65b45db)
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
    "header": {
      "key" : [] //여러값이 올 수 있어서 list임
    }, //응답값 header
    "cookie": [
      {
        "name" : "String",
        "value" : "String",
        "comment" : "String",
        "commentURL" : "String",
        "toDiscard" : Boolean,
        "domain" : "String",
        "maxAge" : long,
        "path" : "String",
        "portlist" : "String",
        "secure" : Boolean,
        "httpOnly" : Boolean,
        "version" : int,
        "header" : "String",
        "whenCreated" : long,
      }
    ], //응답값 cookie
    "url" : "String", //요청 url
    "httpMethod" : "String", //요청 method
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
        "performType" : "CONCUR", // "SEQ"
        "requestList" : [
            {
                "time": {},
                "count": 1, //검증 테스트시에는 1로 고정
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
    "responseTime": 0, //응답 시간
    "body": {}, //응답값 body
    "header": {
      "key" : [] //여러값이 올 수 있어서 list임
    }, //응답값 header
    "cookie": [
      {
        "name" : "String",
        "value" : "String",
        "comment" : "String",
        "commentURL" : "String",
        "toDiscard" : Boolean,
        "domain" : "String",
        "maxAge" : long,
        "path" : "String",
        "portlist" : "String",
        "secure" : Boolean,
        "httpOnly" : Boolean,
        "version" : int,
        "header" : "String",
        "whenCreated" : long,
      }
    ], //응답값 cookie
    "url" : "String" //요청 url
    "httpMethod" : "String" //요청 method
    "status": "string" // 200, 500 등의 상태 코드
  },
  ...
  ],
    "totalTime" : 10,
    "result" : true,
    "userId": "USER-6"
}
```

### 할 일
- lazy로 dynamic import 하는 애들 suspense 로 감싸줘야함

  ## 일정
  Next 강의 다 들은 후에 다시 옴
  - PWA 적용
  - 재렌더링
  - 영역 드래그해서 크기 조절
