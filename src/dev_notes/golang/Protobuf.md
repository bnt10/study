
# 1. Protobuf 정의

프로토콜 버퍼(Protobuf)는 Google에서 개발한 데이터 직렬화 포맷으로, 구조화된 데이터를 효율적으로 직렬화하고, 이를 통해 다양한 데이터 시스템 또는 애플리케이션 간에 메시지를 교환할 수 있게 해줍니다. Protobuf는 플랫폼 및 언어 중립적인 구조와 함께 확장 가능하고 자동으로 코드를 생성할 수 있는 인터페이스 설명 언어(IDL)를 제공합니다. 이는 서버와 클라이언트 사이 또는 내부 시스템 간의 복잡한 구조체를 쉽게 전송, 저장 및 관리할 수 있게 합니다.

# 2. 사용법

## 설치 및 설정

Go에서 Protobuf를 사용하기 위해 먼저 `protoc`, 즉 Protobuf 컴파일러를 설치해야 합니다. 또한, Go 코드를 자동으로 생성할 수 있는 `protoc-gen-go` 플러그인이 필요합니다.

```bash
# protoc 설치
sudo apt-get install protobuf-compiler

# Go 플러그인 설치
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

## .proto 파일 작성

`.proto` 파일에서는 전송하려는 데이터 구조를 정의합니다. 예를 들어, 간단한 메시지를 정의해보겠습니다.

```protobuf
syntax = "proto3";

package example;

// 간단한 사용자 메시지 정의
message User {
  string name = 1;
  int32 id = 2;
  string email = 3;
}
```

## Go 코드 생성

위 `.proto` 파일에서 Go 코드를 생성합니다.

```bash
protoc --go_out=. --go_opt=paths=source_relative example.proto
```

#### Go에서 Protobuf 사용

생성된 Go 코드를 사용하여 Protobuf 메시지를 생성하고 직렬화할 수 있습니다.

```go
package main

import (
    "fmt"
    "log"

    "google.golang.org/protobuf/proto"
    "example"
)

func main() {
    alice := &example.User{
        Name:  "Alice",
        Id:    1234,
        Email: "alice@example.com",
    }

    // 메시지 직렬화
    out, err := proto.Marshal(alice)
    if err != nil {
        log.Fatalln("Failed to encode Alice:", err)
    }

    // 메시지 역직렬화
    newAlice := &example.User{}
    if err := proto.Unmarshal(out, newAlice); err != nil {
        log.Fatalln("Failed to decode Alice:", err)
    }

    fmt.Println(newAlice)
}
```

# 3. REST API에서 gRPC로의 전환 예시

기존 REST API를 gRPC로 변경하는 과정을 예시를 통해 설명합니다.

## REST API (JSON)

```http
GET /users/123
Accept: application/json

{
    "id": 123,
    "name": "Alice",
    "email": "alice@example.com"
}
```

## gRPC (Protobuf)

```protobuf
// Proto 파일
service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
    int32 id = 1;
}

message UserResponse {
    int32 id = 1;
    string name = 2;
    string email = 3;
}
```

```go
// Go 클라이언트 예시
func getUser(client UserServiceClient, id int32) {
    resp, err := client.GetUser(context.Background(), &UserRequest{Id: id})
    if err != nil {
        log.Fatalf("Could not retrieve user: %v", err)
    }
    fmt.Printf("Name

: %s, Email: %s\n", resp.Name, resp.Email)
}
```

# 4. 장단점

## 장점
- **효율적인 데이터 직렬화**: Protobuf는 JSON이나 XML보다 훨씬 작은 크기로 데이터를 직렬화할 수 있어, 네트워크 트래픽과 저장 공간을 절약할 수 있습니다.
- **언어 및 플랫폼 독립성**: 다양한 언어와 플랫폼에서 사용할 수 있어, 시스템 간 호환성이 뛰어납니다.
- **자동 코드 생성**: 데이터 접근 클래스를 자동으로 생성하여, 보일러플레이트 코드를 줄이고 오류 가능성을 낮출 수 있습니다.

## 단점
- **학습 곡선**: 새로운 구문과 툴을 학습해야 하며, 처음 접하는 사용자에게는 다소 복잡할 수 있습니다.
- **동적 접근 제한**: Protobuf는 컴파일 타임에 타입이 결정되므로, 런타임에 타입 구조를 변경하는 것이 제한됩니다.

