## 구상
### 레이아웃
라우터대신 퍼널 사용해서 간단하게 (토스 slash23 참고)
![image-20230614234956754](README.assets/image-20230614234956754.png)

![image-20230614235105261](README.assets/image-20230614235105261.png)


### API Call 규격
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





### 컴포넌트 기반 개발

- TDD로 진행
  - 스토리북, jest, rtl 활용 테스트
  - emotion, framer, scss로 애니메이션과 스타일링
  - atomic, compound 패턴 활용
  - rem 기준으로 크기 지정 (px ㄴㄴ)
  - 개발할 컴포넌트 목록
    - Tabs (antd의 tabs 참고)
    - Table
    - Button
      - 기본형, dropdown과 함께 2가지 형태
    - 검색되는 select와 input 합친 거 (ex: postman의 method 선택상자)

### 전역 상태관리
- recoil만 사용?

### 에러처리
- ErrorBoundary, Suspense 활용하기


### 할 일

1. Header 로그아웃 버튼(버튼 컴포넌트로) 추가
2. APIs 스타일링
3. Tabs 만들기
4. 레이아웃 너무 작을시 화면이 넘작으면 안보여요 넣기
5. 레이아웃작을시 헤더 짤리는거 보완
