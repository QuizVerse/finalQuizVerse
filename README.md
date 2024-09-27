# 통합 학습 플랫폼 Quizverse
<img src="/src/main/reactjs/public/logooo.png" width="370" style="text-align: center;">
- 배포 URL : https://www.quizverse.kro.kr/

<br>

## 프로젝트 소개
- 문제집 제작, 배포를 통한 통합 학습 플랫폼
- 실시간 화상 스터디를 활용한 몰입형 학습 경험을 제공
- 최초 사용자들을 위한 챗봇 기능 지원

<br>

## 팀원 구성

**유니** | **정상혁** | **우태형** | **김도훈** | **강하윤** | **박민지**
----- |  ------ |------|------|------|------
[@ynnotun](https://github.com/ynnotun) | [@hyuck9409](https://github.com/hyuck9409) | [@taehyoung809](https://github.com/taehyoung809) | [@kimdohun1108](https://github.com/kimdohun1108) | [@hayooniiiiii](https://github.com/hayooniiiiii) | [@alswl11](https://github.com/alswl11) 


<br>

## 1. 개발 환경
- Front End : React, Axios, react-router-dom, MUI(Material-UI), swiperjs 
- Back End : Spring Boot, JSON Web Token(JWT), OAuth 2.0, JPA, Spring Security, MySQL, Node.js, Hibernate, Spring Websocket
- 버전 관리 : Git, Github
- 협업 툴 : Jira, Trello, Postman, figma
- 서비스 배포 환경 : Docker, Dockerhub, Jenkins, Gradle, npm
- Naver Cloud & API : Object Storage, Cloud DB for MySQL, RESTful API(naver, google, kakao login), GPT API, OpenVidu, SMTP, Live Kit


## 2. 채택한 개발 기술과 브랜치 전략
### 브랜치 전략
- main, test-merge, test-deploy 브랜치와 팀원별 브랜치를 나누어 진행했습니다.

#### main
- test-merge 브랜치에서 test가 끝난 코드를 배포하기 위해서 사용하는 브랜치입니다.

#### test-merge
- 개발 단계에서 main 역할을 하는 브랜치입니다. 
- 팀원들의 branch에서 코드를 병합합니다.

#### test-deploy
- test-merge 브랜치의 코드를 메인 배포 이전에 시험적으로 배포 후 확인하기 위한 브랜치입니다.


 
  
## 3. 역할 분담
### 유니
- PM 및 팀장
- 프로젝트 구조 설계
- 문제집 에디터 개발

<br>

### 정상혁
- 페이지네이션, 사이드바 등 공용 컴포넌트 개발
- 메인 홈 디자인 및 기능 추가 
- 필터링 기능 구현

<br>

### 우태형
- 검색 기능 구현
- 문제 출제 미리보기
- 챗봇 구현

<br>

### 김도훈
- 화상 스터디 기능 총괄
- 채팅 구현
- 서버 배포 담당

<br>

### 강하윤
- JWT 및 사용자 Access 관리
- OpenAI 기능 구현
- 문제풀기 및 오답노트
- 회원 탈퇴 구현


<br>

### 박민지
- 서버 배포
- 문제 채점
- PDF 출력


## 4. 개발 기간 및 작업 관리
### 개발 기간
- 전체 개발 기간 : 2024-07-09 ~ 2024-09-18
- 프로젝트 설계 : 2024-07-09 ~ 2024-08-13
- 개발 : 2024-08-13 ~ 2024-09-18
- 발표 준비 및 발표 :  2024-09-18 ~ 2024-09-20

<br>

## 프로젝트 자료
- [발표 자료](https://github.com/QuizVerse/finalQuizVerse/blob/main/%EB%8D%B0%EB%B8%8C%EC%98%B5%EC%8A%A4%2011%EA%B8%B0%20QUIZVERSE%20%EC%B5%9C%EC%A2%85%20%EB%B0%9C%ED%91%9C%20%EC%9E%90%EB%A3%8C.pdf)
- [기능 시연 영상](https://youtu.be/SCJ_sUh3L70)

