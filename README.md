## 원티드 프론트엔드 3주차 과제

## 프로젝트 소개
한국 임상 정보의 검색 영역을 클론하기 <br/>
검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

## 실행영상

## 프로젝트 기간
23.07.16 ~ 23.07.19

## 실행방법
 ```zsh
 cd pre-onboarding-11th-3-02
 $ npm install
 $ npm start
 ```
## 요구사항
- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
- 검색어가 없을 시 “검색어 없음” 표출
- API 호출별로 로컬 캐싱 구현
  - 캐싱 기능을 제공하는 라이브러리 사용 금지(React-Query 등)
  - 캐싱을 어떻게 기술했는지에 대한 내용 README에 기술
  - expire time을 구현할 경우 가산점
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

## 개발환경
- 언어 : TypeScript
- 라이브러리
  - axios
  - styled-component
  - react-router-dom
## 프로젝트 구조
```
📦 src
├── 📂 apis
├── 📂 component
├── 📂 hook
├── 📂 interface
├── 📂 pages
│    └── 📂 Search
├── 📂 svg
└── 📂 utils
``` 
