## http


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
