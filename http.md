
## http

HTTP 메소드의 종류는 총 9가지 입니다. 



- GET : 메서드는 특정 리소스의 표시를 요청합니다. GET을 사용하는 요청은 오직 데이터를 받기만 합니다.
- POST : 주로 데이터 등록에 사용 데이터 요청을 처리하고, 메시지 바디를 통해 서버로 데이터를 전달한다. 주로 신규 리소스를 등록하거나 프로세스 처리에 사용됩니다.
- PUT : 리소스를 대체
- PATCH : 리소스를 일부만 변경 PUT과 마찬가지로 리소스를 수정할 때 사용하지만, PATCH는 리소스를 일부분만 변경할 수 있다.
- DELETE : 리소스 삭제 리소스를 제거할때 사용한다.
- HEAD: GET과 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환
- OPTIONS: 대상 리소스에 대한 통신 가능 옵션을 설명(주로 CORS에서 사용)
- CONNECT: 대상 자원으로 식별되는 서버에 대한 터널을 설정
- TRACE: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행


### PUT VS PATCH

PUT 과 PATCH의 차이에 대해서 자세히 알아 봅시다.

PUT의 경우 전체에 대해서 덮어쓰기가 되기 때문에 변경하고 하는 리소스에 대해서 변경 목록을 모두 제공하지 않는 경우 빈 값으로 변경됩니다.

PUT /members/1
```
{

    name : "홍길동",

    age : 19,

    gender : "M"

}
```
 |member|1|
|------|---|
|name|홍길동|
|age|19|
|gender|M|

PUT /members/1
```
{

    name : "홍길동",

   `age: ""`,

    gender : ""

}
```
 |member|1|
|------|---|
|name|홍길동|
|age| |
|gender| |
 
 
`PATCH /members/1`
```
{

    name : "홍길동",

   age: "",

    gender : ""

}
```
 |member|1|
|------|---|
|name|홍길동|
|age| 19|
|gender|M|





- An Etag header is included in the HTTP response for an API resource. What are two benefits of using the value of the Etag for future interactions involving the same API resource

  **caching and optimization of response payloads**

  **creating conditional requests**

  Explanation

   The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed. Additionally, etags help prevent simultaneous updates of a resource from overwriting each other ("mid-air collisions").
   The ETag or entity tag is part of HTTP, the protocol for the World Wide Web. It is one of several mechanisms that HTTP provides for Web cache validation, which allows a client to make conditional requests.

---

- A client is written that uses a REST API to interact with a server. Using HTTPS as the transport, an HTTP request is sent and received an HTTP response. The response contains the HTTP response status code: 503 Service Unavailable.
Which action is the appropriate response?

  **Look for a Retry-After header in the response and resend the request after the amount of time indicated.**


- Which two countermeasures help reduce the risk of playback attacks? (Choose two.)

  Implement message authentication (HMAC).
  Use short-lived access tokens.
