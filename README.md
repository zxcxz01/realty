GreenBank
-
멋쟁이 사자처럼 (클라우드 엔지니어링 스쿨 1기)
프로젝트 기간 : 3일

1.Introduce
-
Project Summary
GreenBank - 은행 웹사이트를 배경으로 회원가입, 로그인/로그아웃, 부동산 매입/매수, 매물조회, 매물수정/삭제를 node.js로 구현

**1.1 Team**
-  4조 김영광
-  4조 정소은

**1.2 Skill & Tool**
-  html
-  css
-  bootstrap
-  JavaScript
-  jQuery
-  ejs
-  node.js
-  mongoDB

`npm i install express`<br>
`npm i install express-session`<br>
`npm i install mongodb`<br>
`npm i install nodemon`<br>
`npm i install cookie-parser`<br>
`npm i install body-parser`<br>
`npm i install ejs`

**1.3 구현기능**
- user-회원가입
- user-로그인
- building-등록
- building-조회
- building-수정/삭제

2.구조
-

**2.1 데이터베이스**
- building: 부동산 매물 게시글 정보
- user: 회원 정보
- counter: 부동산 매물 게시글 고유 번호

![Untitled](https://github.com/sssoeun/realty/assets/139853314/c6351471-71b8-4a6d-b4ec-a1b8ed99487f)

3.Features
-
**3.1 회원-회원가입**

![image](https://github.com/sssoeun/realty/assets/139853314/cb246842-62ff-4f8a-9d47-c77081bbc0c3)

![image](https://github.com/sssoeun/realty/assets/139853314/49ce7b7a-642b-4821-8d3b-4e491e7937d1)

![image](https://github.com/sssoeun/realty/assets/139853314/acfdf30e-91e7-4a5e-8d04-87327fb7d0c9)

![image](https://github.com/sssoeun/realty/assets/139853314/82052c6d-2ca4-4808-845a-ea07d12989df)

-  유효성 검사를 마치면 db에 저장 후 가입 완료

**3.2 회원 - 로그인**

![image](https://github.com/sssoeun/realty/assets/139853314/f5f2a320-357f-418c-a417-f83d8e7a5fc2)

![image](https://github.com/sssoeun/realty/assets/139853314/cce9e275-eaba-4265-9b46-1ac4014cae6a)

![image](https://github.com/sssoeun/realty/assets/139853314/6a871965-937e-4fa1-ae4a-12d8bf17114a)


-  로그인 폼에서 userId, userPw 값을 입력받은 후 db에 있는 데이터와 비교하여 데이터 유효성을 판별 후 로그인시키고, 로그인 됐을 시 로그인 된 상태로 변경 후 세션에 로그인 정보를 저장하여 유지


**3.3 부동산 - 매물 등록**

![image](https://github.com/sssoeun/realty/assets/139853314/dfa29e81-1c65-454b-83cd-27c7ca8ffa42)

-  navbar의 부동산 링크 클릭

![image](https://github.com/sssoeun/realty/assets/139853314/f50c4a64-49c1-464b-95de-cf11b5649d2f)

-  우리집 등록 드롭다운의 등록하기 링크 클릭

![image](https://github.com/sssoeun/realty/assets/139853314/7623d830-cffe-4422-8549-491135a89abe)

-  로그인 여부를 판별한 후 매물 등록창으로 이동

![image](https://github.com/sssoeun/realty/assets/139853314/c8d747f8-3d31-4eb5-ab1f-a4c1840cb335)

![image](https://github.com/sssoeun/realty/assets/139853314/36a4c551-4eb6-463c-856e-5a42d83af46c)


- 등록 폼에 값 입력 후 등록 시 db에 저장되고 매물 목록으로 이동


**3.4 부동산 - 매물 조회**

![image](https://github.com/sssoeun/realty/assets/139853314/fa7ccd35-751e-429b-acc3-537c1f480c7b)

-  매물 목록 게시판에서 옵션별로 조회 가능, 동적으로 페이징 구현

![image](https://github.com/sssoeun/realty/assets/139853314/88e82203-707a-4562-a159-4412dd38bfb1)

-  매물 주소 클릭 시 매물 상세정보 확인 가능

-  카카오맵 API를 이용해 주소 실제 위치를 지도에 표시

![image](https://github.com/sssoeun/realty/assets/139853314/8a620f13-e9d5-4e44-b214-6123be13ecea)

![image](https://github.com/sssoeun/realty/assets/139853314/5df83897-0b69-46e3-8999-9cd2f8a42b22)

-  구매하기 버튼 클릭 시 status가 판매완료로 변경되고 매물 상세정보 링크 비활성화

**3.5 부동산 - 매물 수정/삭제**

![image](https://github.com/sssoeun/realty/assets/139853314/c9ac8b57-3262-4164-acaa-3e5460c3d46d)


![image](https://github.com/sssoeun/realty/assets/139853314/dc6c9c64-06b6-4f49-913c-d476a3fef61f)

-  매물 상세정보 페이지에서 수정하기 누를 시 수정 페이지로 이동

![image](https://github.com/sssoeun/realty/assets/139853314/953d2cb1-c49e-4c3d-9b26-bbf5507e2db4)

- 수정 폼에서 내용을 변경한 후 수정완료 버튼을 누르면 값이 수정

![image](https://github.com/sssoeun/realty/assets/139853314/0c6569f7-776f-449d-8a83-5689ee43cb22)

![image](https://github.com/sssoeun/realty/assets/139853314/5df3814a-3647-4c44-9215-de1107a6ca4a)

- 매물 목록 리스트에서 삭제 버튼을 누를 시 삭제 여부를 묻는 alert창이 뜨고, 예를 누를 시 삭제


4.소감
-

김영광

https://velog.io/@zxcxz01/페어-프로젝트

정소은

https://velog.io/@soeun0613/%ED%8E%98%EC%96%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8
완성하고 나서 보니, 기능 구현보다는 자원 소모를 줄이는 방향으로 코드를 작성했더라면 더 좋았을 것이라는 아쉬움이 들었습니다. 하지만 다양한 기능을 추가하는 과정에서 많은 시행착오를 겪으며 많은 것을 배울 수 있었습니다.
아직 모든 코드를 완벽히 이해하지는 못했지만, 기능을 확장해 나가면서 점차 내 것으로 만들어 갈 것입니다.
