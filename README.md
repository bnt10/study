# study

[http]
An Etag header is included in the HTTP response for an API resource. What are two benefits of using the value of the Etag for future interactions involving the same API resource

caching and optimization of response payloads

creating conditional requests

Explanation

- The ETag HTTP response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed. Additionally, etags help prevent simultaneous updates of a resource from overwriting each other ("mid-air collisions").
- The ETag or entity tag is part of HTTP, the protocol for the World Wide Web. It is one of several mechanisms that HTTP provides for Web cache validation, which allows a client to make conditional requests.
