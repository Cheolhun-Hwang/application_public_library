# KISA Public Library Main Server
## 인증방법
- Client : 키 발급 요청
- Server : 임시 키 발급, IP 저장
- Client : 임시 키, 등록 요청 (회원정보 / 도서 정보)
- Server : 성공 : 인증키 발급, 실패 : 실패 이유

## Encrypt
- 'aes-256-cbc' : 'utf8' > 'base64'
## Decrypt
- 'aes-256-cbc' : 'base64' > 'utf8'

## 데이터 베이스 저장 모듈
- LibraryManagement
  - 아이디
  - 비밀번호(encrypt)
  - 이름(encrypt)
  - 직책
  - 부서
  - 전화번호(encrypt)
  - 이메일(encrypt)
  - 발급 Auth Key
- LibraryBooks
  - 제목
  - 저자
  - 출판사
  - 분야
  - 출판년도
  - 등록일
  - 도서관
  - 발급 Auth Key
- Users
  - 아이디
  - 비밀번호(encrypt)
  - 이름(encrypt)
  - 전화번호(encrypt)
  - 이메일(encrypt)
  - 발급 Auth Key
- TempAccessAuthTable
  - index
  - date
  - Random key
  - IP
  
## RestAPI
1. 서버요청
- url : `/api/request_key`
- method : `Get`
- explain : 
  - 중앙서버의 모든 요청(request)은 서버요청을 통해 임시 키가 발급된 상태로 진행. 
  - 확인 후 임시 키는 데이터베이스에서 삭제
  - 임시 키는 요청 IP와 임시키를 비교하여 모두 일치할 때 진행.
- input : `None`
- res : 
```
{
  code : 200,
  key : "ANSI..."
}

- code : 200 성공, 400 실패
- key : 임시 발급 키
```

2. 도서 정보 요청
- url : `/api/book/list`
- method : `Get`
- explain : 
  - 각 도서관에 발급된 키 정보를 바탕으로 세부 도서 정보 목록 제공.
- input : 
  - key : 임시 발급 키
  - list : `[book_key1, book_key2, book_key3, ...]`
- res : 
```
{
  code : 200,
  lists : [{
    "name" : "제목",
    "writter" : "저자",
    "public" : "출판사",
    "part" : "분야",
    "year" : "출판년도"
    "create" : "등록일"
  },{
  ...
  },...]
}

- code : 200 성공, 400 실패
- lists : 도서 세부정보 목록
```

3. 도서 등록
- url : `/api/book/add`
- method : `Post`
- explain : 
  - 도서 정보 등록.
  - 도서 정보 등록 시 출판일, 도서명 등 중복 체크
  - 중복 시 발급된 키 반환, 중복되지 않을 시 키 발급
- input : 
  - key : 임시 발급 키
  - book : `{"title" : "제목","writter" : "저자","public" : "출판사","part" : "분야","year" : "출판년도", "create" : "등록일"}`
- res : 
```
{
  code : 200,
  key : ICSZ...
}

- code : 200 성공, 400 실패
- key : 도서 키(6001+등록일/시간(201908211546)+임시키(10자))
```

4. 도서 대출 내역 조회
- url : `/api/book/history`
- method : `Get`
- explain : 
  - 도서 대출 내역에 대한 세부 정보 조회.
- input : 
  - key : 임시 발급 키
  - book : 도서 발급 키
  - list : 대출한 사용자 발급 키 목록 `[user_key1, user_key2, user_key3, ...]`
- res : 
```
{
  code : 200,
  book : {
    "title" : "제목",
    "writter" : "저자",
    "public" : "출판사",
    "part" : "분야",
    "year" : "출판년도"
    "create" : "등록일"
  },
  lists : [{
    "name" : "이름"
  },{
  ...
  },...]
}

- code : 200 성공, 400 실패
- book : 도서 내용
- lists : 대출한 사용자 정보 목록
```

5. 사서 로그인
- url : `/api/mng/login`
- method : `Post`
- explain : 
  - 사서로그인.
- input : 
  - key : 임시 발급 키
  - id : 아이디
  - pwd : 비밀번호 (encrypt)
- res : 
```
{
  code : 200,
  auth : {
    "name " : "이름(encrypt)"
    "position" : "직책" 
    "part" : "부서"
    "phone" : "전화번호(encrypt)"
    "email" : "이메일(encrypt)"
  }
}

- code : 200 성공, 400 실패
- auth : 회원정보
```

6. 사서 회원가입
- url : `/api/mng/register`
- method : `Post`
- explain : 
  - 사서로그인.
- input : 
  - key : 임시 발급 키
  - id : 아이디
  - pwd : 비밀번호 (encrypt)
  - info : 
  ```
  {
    "name " : "이름(encrypt)"
    "position" : "직책" 
    "part" : "부서"
    "phone" : "전화번호(encrypt)"
    "email" : "이메일(encrypt)"
  }
  ```
- res : 
```
{
  code : 200,
  key : ICSZ...
}

- code : 200 성공, 400 실패
- key : 사서 발급 키(6001+등록일/시간(201908211546)+임시키(10자))
```