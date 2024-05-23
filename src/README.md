# 폴더 구조

- () : 실제 라우팅에는 영향을 줄 수 없지만 그루핑에 목적을 둔다.
    - (afterLogin)/home -> /home
    - (beforeLogin)/home -> /home
- [] : 동적 라우팅에 목적을 둔다.
    - [username]/1 -> sung/1, seokmin/1

# layout vs template

- layout: 페이지 이동 후에도 리렌더링이 되지 않는다.
- template: 페이지 이동 후 리렌더링이 된다.