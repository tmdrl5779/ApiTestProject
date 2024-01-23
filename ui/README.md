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

- 공통
  - PWA 적용 (내 bolilerplate 환경에서 정석방법이 안먹혀서 안되는 중)
  - 로컬스토리지, API 저장 데이터 동기화 (O)
  - TODO들 다 처리하기
- API 호출

  - 재렌더링 이슈
  - 드래그해서 res, req탭 높이 조정
- 성능 테스트
  - 공통
    - 재렌더링도 다 잡아야함
    - test response를 쓰로틀링해서 1초마다 업뎃시키기

  - 결과 페이지
    - 그래프
      - API 별로도 볼 수 있으면 좋을 듯
        - 오른쪽에 legends 놓고 label, total 눌러서 switch 하도록?
      
    - 트리
      - 왼쪽 유저 목록에 windowing 적용하기
    - 요약

- 다크모드
- 배포해서 SEO, 성능, 접근성 최적화
- 스토리북 도입

### 수정요청
- API Time 설정하는 부분 기본 10초로 지정, 1초 이하로 설정 못하도록 수정 (O)
- Socket open 되면 메세지 보내기, 메세지 1번만 보내기 (O)
  (현재 open전에 보내는 중, 메세지 2번 보내는중)
  ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/1a503cac-ac70-440b-a704-6f9f1fdea08e)
- 결과 페이지에서 뒤로가기 누르면 socket close하기 (getWebsocket.close() 로 닫는데? 따로 메세지 보내야대니)
- 뒤로가기 누르면 기존 세팅한 값 보여주기 (O)
  (현재 api 설정값은 기존 세팅한값 불러오는데, 위에 user, repeat, loop는 초기값으로 바뀜
- 결과 트리 기본 세팅이 맨위 결과 포커스 되면 좋을듯 뭔가 허전한느낌 (O)
- Request exception 추가했음 (status 에러 상태면 에러 표시나게함)
  - Connection time out -> http status 597
  - ReadTime out -> http status 598
  - else -> http stats 599
  ( test.com < 없는 도메인으로 call 하면 기존에는 서버에러 나왔지만 Connection time out -> http status 597로 나오게 수정했음)


  ## 일정

  - API 합치기, 다크모드
    - 나중에 함
  - 1차 배포 (2.3)
    - 도메인 사기
    - 클라우드 활용
      - node로 프론트서버
  - 배포 하고
    - SEO , 접근성, 성능 최적화
    - 에러 모니터링 설정 sentry

  

  
