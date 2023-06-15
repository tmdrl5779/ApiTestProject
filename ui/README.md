## 구상
### 레이아웃
라우터대신 퍼널 사용해서 간단하게 (토스 slash23 참고)
![image-20230614234956754](README.assets/image-20230614234956754.png)

![image-20230614235105261](README.assets/image-20230614235105261.png)

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



### 할 일

1. 레이아웃 코드로 구현

2. Tabs 컴포넌트 개발
