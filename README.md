# PostWeb

<div align="center">
	<img src = './logo192.png'
</div>

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Ftmdrl5779%2FApiTestProject&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

</div>

# API TEST POJECT
개발기간 : 1 Month

## URL

> [https://api-test-project.vercel.app/](https://api-test-project.vercel.app/) <br>

## Member

|      김승기       |          정현우         |
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|   https://github.com/tmdrl5779  | https://github.com/fe-jhw |
| Back-End | Front-End |

## Proejct Info

웹페이지에서 간단하게 API 호출을 할 수 있는 API 테스트 프로젝트입니다.
<br/>
<br/>
PostMan 과 같이 API 호출 테스트를 할 수 있습니다. GET, POST, PUT, PATCH, DELETE Method와 Body, Header등의 요청 값을 세팅할 수 있습니다. 
<br/>
Jmeter 와 같이 API 성능 테스틀 할 수 있습니다. 동시 호출 인원, 반복횟수 반복시 대기 시간이 가능하며, 한사람 기준으로 여러 API를 동시 또는 순차적으로 호출할 수 있습니다.
<br/>
<br/>
Front는 Vercel을 통해 배포가 되어있으며, Back은 Koyeb을 통해 배포가 되어있습니다.
   

## Guide

### API 호출 기능
- PostMan과 같이 API를 호출할 수 있습니다.
- API 호출 테스트
  ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/55f99e49-c01b-4fc5-8e84-0f24abb8f194)
   - API 호출 탭을 클릭합니다.
   - HTTP Request Method를 선택합니다.
   - URI를 입력 후 필요한 요청값을 세팅합니다.

   
- 결과
  ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/fdfd6b5b-65b6-464b-858a-2c68d98270e2)
  - 응답 결과를 확인할 수 있습니다.

### API 성능 테스트 기능
- Jmeter과 같이 API 성능 테스트를 할 수 있습니다.
- API 성능 테스트
  ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/4251488b-7d79-48fa-8da5-1f67db17bbce)
  - 성능 테스트 탭을 클릭합니다.
  - Number of Thread (users) : 동시에 API를 호출할 인원수를 세팅합니다.
  - Repeat Count : 반복횟수를 세팅합니다.
  - Loop Count (seconds) : 반복 사이에 대기할 시간을 세팅합니다.
  - API 추가 : 한 user가 호출하는 API를 추가할 수 있습니다. API추가시 아래 API리스트가 추가됩니다.
  - 동시호 활성화 : 동시호출 활성화 시 추가된 API를 한 user가 동시에 호출합니다. 비활성화 시 순차적으로 호출합니다.
  - API리스트에서 호출할 API를 세팅할 수 있습니다.

   
- 결과
  - 진행도를 확인할 수 있습니다. 
  - 결과 트리
    ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/33f27457-241d-4b1d-bab4-56f29ca7231b)
    - user를 선택하여 한 user 가 호출한 전체 결과를 확인할 수 있습니다.
  - 결과 그래프
    ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/82941dfc-11f6-4c2e-8fd2-a3832a47b38d)
    - 결과를 그래프로 확인할 수 있습니다.
    - 점을 클릭 시 테스트 결과 상세를 확인할 수 있습니다.
  - 결과 요약
    ![image](https://github.com/tmdrl5779/ApiTestProject/assets/45285712/aa736867-d0b8-4f3b-b49d-678bffbd4af0)
    - 결과에 대한 전체 요약을 확인할 수 있습니다.
   

## Stacks 
### Development
- Frontend
  - TypeScript
  - React 18
  - 배포 : Vercel

- Backend
  - Kotlin
  - Spring Webflux
  - Coroutine
  - 배포 : Koyeb

---
## 한계점 및 회고
- 서버 한계
  - API를 호출할 때 중간 서버를 거치기 때문에 서버의 성능에 따라서 응답시간에 차이가 발생

```
