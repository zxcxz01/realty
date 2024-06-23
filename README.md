GreenBank
-
멋쟁이 사자처럼 (클라우드 엔지니어링 스쿨 1기)

1.Introduce
-
Project Summary
GreenBank - 은행 웹사이트를 배경으로 부동산 매수/매입, 매물조회, 로그인/로그아웃, 회원가입을 node.js로 구현

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

-  카카오맵 API를 이용해 주소 실제 위치를 지도에 표시

![image](https://github.com/sssoeun/realty/assets/139853314/8a620f13-e9d5-4e44-b214-6123be13ecea)

-  매물 주소 클릭 시 매물 상세정보 확인 가능

![image](https://github.com/sssoeun/realty/assets/139853314/5df83897-0b69-46e3-8999-9cd2f8a42b22)

-  구매하기 버튼 클릭 시 매물 상세정보 링크 비활성화

**3.5 부동산 - 매물 수정/삭제**
