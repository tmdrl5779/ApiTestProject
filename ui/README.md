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

1. API req정보 편집기 데이터처리 로직 추가 (O) - 리팩토링 필요 memo로 재렌더링 방지, prop drilling 해결
2. API res정보 조회기 데이터처리 로직 추가
3. 탭 스크롤 기능 추가(O) + 양끝 그라데이션 + 스크롤 부드럽게 해야함
   양 옆에 버튼 먼저 추가 overflow 여부 판별해서 overflow일때만 보여준다.(O)
   클릭시에 일정 간격 스크롤 하도록(O)

- 양끝 그라데이션도 넣기 - 스크롤 할 공간이 있을 경우에만

4. dev:msw 모드와 일반 dev 모드 추가
