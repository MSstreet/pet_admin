# pet 관리자

##  임명수
## 2024-01-09

- pet 관리자 환경셋팅
- 관리자 공지사항 게시판 CRUD 개발
  
#### ⚠️ 발생한 이슈 및 해결

1. can not resolve error

⚒️ 해결 방법  

- File > Project Structure > sdk 설정

2. access denied 에러 / unkown db 에러

⚒️ 해결 방법

- root 계정 접속 > db 생성 > 유저 생성 및 권한 설정

## 2024-01-14

- (react 사용) 공지사항 데이터 axios를 이용해 화면에 출력해보기
  
#### ⚠️ 발생한 이슈 및 해결

1. api 요청 시 cors 에러

⚒️ 해결 방법  

- 서버 쪽 Controller에 CrossOrigin 어노테이션 설정 

2. Objects are not valid as a React child 에러 발생

⚒️ 해결 방법

- 랜더링 할 때 오브젝트 타입을 그대로 화면에 출력하려 했기에 나타난 에러이기 때문에 랜더링 할 때 오브젝트 데이터를 처리해서 데이터 타입을 정확히 설정


## 2024-01-16

- 공지사항 상세 화면 개발
  
#### ⚠️ 발생한 이슈 및 해결

1. Each child in a list should have a unique "key" prop 에러 발생

⚒️ 해결 방법  

- 배열로 map 함수를 사용해 JSX 리스트를 구현할 때 key prop을 자식 컴포넌트마다 넣어줘야 한다고 한다는데 이 때 key값이 고유한 값이어야 한다.
- server에서 받아온 데이터에서 고유한 값(notice_idx)을 key값으로 설정해 주었다. 

  
2. 서버 Detail 조회 api에서 url에 PathVariable를 포함하여 특정 공지사항 글을 조회한다. 내가 설정한 PathVariable 타입은 notice_idx이고 Type은 Long 타입인데 react에서 useParam을 이용하여 PathVariable에 해당하는 값을 넣어주었더니 해당 값이 String이 되었기 때문에 에러가 났다.

⚒️ 해결 방법


## 2024-01-23

- 공지사항 예외 처리 / 리뷰 조회 개발 
  
#### ⚠️ 발생한 이슈 및 해결

⚒️ 해결 방법  

   
## 2024-01-29

- 리뷰 api 개발 완료 / 유저, 동물병원 api 개발 중
  
#### ⚠️ 발생한 이슈 및 해결

⚒️ 해결 방법  
