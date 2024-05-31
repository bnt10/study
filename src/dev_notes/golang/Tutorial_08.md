### 네트워킹

#### 1. TCP 서버

TCP 서버를 구현하는 방법입니다. `net` 패키지를 사용합니다.

```go
package main

import (
    "bufio"
    "fmt"
    "net"
)

func main() {
    // TCP 서버 시작
    ln, err := net.Listen("tcp", ":8080")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer ln.Close()

    for {
        // 클라이언트 연결 수락
        conn, err := ln.Accept()
        if err != nil {
            fmt.Println(err)
            continue
        }

        // 클라이언트와 통신 처리
        go handleConnection(conn)
    }
}

func handleConnection(conn net.Conn) {
    defer conn.Close()
    message, _ := bufio.NewReader(conn).ReadString('\n')
    fmt.Print("Message received:", string(message))
    conn.Write([]byte(message))
}
```

#### 2. TCP 클라이언트

TCP 클라이언트를 구현하는 방법입니다. `net` 패키지를 사용합니다.

```go
package main

import (
    "bufio"
    "fmt"
    "net"
    "os"
)

func main() {
    // 서버에 연결
    conn, err := net.Dial("tcp", "localhost:8080")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer conn.Close()

    // 서버에 메시지 전송
    fmt.Fprintf(conn, "Hello, Server!\n")

    // 서버로부터 메시지 수신
    message, _ := bufio.NewReader(conn).ReadString('\n')
    fmt.Print("Message from server:", message)
}
```

#### 3. HTTP 서버

HTTP 서버를 구현하는 방법입니다. `net/http` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

#### 4. HTTP 클라이언트

HTTP 클라이언트를 구현하는 방법입니다. `net/http` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    // HTTP GET 요청
    resp, err := http.Get("http://localhost:8080")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    // 응답 본문 읽기
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(string(body))
}
```

#### 5. WebSocket 서버

WebSocket 서버를 구현하는 방법입니다. `gorilla/websocket` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func handler(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer conn.Close()

    for {
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            fmt.Println(err)
            return
        }
        if err := conn.WriteMessage(messageType, p); err != nil {
            fmt.Println(err)
            return
        }
    }
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

#### 6. WebSocket 클라이언트

WebSocket 클라이언트를 구현하는 방법입니다. `gorilla/websocket` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "log"
    "net/url"

    "github.com/gorilla/websocket"
)

func main() {
    u := url.URL{Scheme: "ws", Host: "localhost:8080", Path: "/"}
    conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
    if err != nil {
        log.Fatal("dial:", err)
    }
    defer conn.Close()

    // 서버에 메시지 전송
    err = conn.WriteMessage(websocket.TextMessage, []byte("Hello, Server!"))
    if err != nil {
        log.Fatal("write:", err)
    }

    // 서버로부터 메시지 수신
    _, message, err := conn.ReadMessage()
    if err != nil {
        log.Fatal("read:", err)
    }
    fmt.Printf("Message from server: %s\n", message)
}
```

#### 7. HTTP 서버에서 JSON 데이터 처리

HTTP 서버에서 JSON 데이터를 처리하는 방법입니다.

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Message struct {
    Text string `json:"text"`
}

func handler(w http.ResponseWriter, r *http.Request) {
    var msg Message
    err := json.NewDecoder(r.Body).Decode(&msg)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    fmt.Fprintf(w, "Received: %s", msg.Text)
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

#### 8. HTTP 클라이언트에서 JSON 데이터 전송

HTTP 클라이언트에서 JSON 데이터를 전송하는 방법입니다.

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type Message struct {
    Text string `json:"text"`
}

func main() {
    msg := Message{Text: "Hello, Server!"}
    jsonData, err := json.Marshal(msg)
    if err != nil {
        fmt.Println(err)
        return
    }

    resp, err := http.Post("http://localhost:8080", "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        fmt.Println(err)
        return
    }
    defer resp.Body.Close()

    var responseMsg Message
    err = json.NewDecoder(resp.Body).Decode(&responseMsg)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Printf("Response from server: %s\n", responseMsg.Text)
}
```

#### 9. TLS/SSL을 사용한 HTTP 서버

TLS/SSL을 사용하여 HTTP 서버를 보안하는 방법입니다. `http.ListenAndServeTLS` 메서드를 사용합니다.

```go
package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, Secure World!")
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Starting secure server on :8443")
    err := http.ListenAndServeTLS(":8443", "server.crt", "server.key", nil)
    if err != nil {
        fmt.Println(err)
    }
}
```

#### 10. 파일 서버

HTTP 파일 서버를 구현하는 방법입니다. `http.FileServer` 함수를 사용합니다.

```go
package main

import (
    "net/http"
)

func main() {
    fs := http.FileServer(http.Dir("static"))
    http.Handle("/", fs)

    http.ListenAndServe(":8080", nil)
}
```

#### 11. HTTP 서버 라우팅

HTTP 서버에서 다양한 경로를 처리하기 위해 라우팅을 사용하는 방법입니다. `gorilla/mux` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/", HomeHandler)
    r.HandleFunc("/products", ProductsHandler)
    r.HandleFunc("/articles", ArticlesHandler)
    http.Handle("/", r)
    http.ListenAndServe(":8080", nil)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to the Home Page!")
}

func ProductsHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "This is the Products Page!")
}

func ArticlesHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "This is the Articles Page!")
}
```

#### 12. gRPC 서버 및 클라이언트

gRPC를 사용하여 고성능 원격 프로시저 호출을 구현하는 방법입니다.

##### gRPC 서버

```go
// main.go
package main

import (
    "context"
    "log"
    "net"

    pb "path/to/your/protobuf/package"

    "google.golang.org/grpc"
)

const (
    port = ":50051"
)

type server struct {
    pb.UnimplementedYour

ServiceServer
}

func (s *server) YourMethod(ctx context.Context, in *pb.YourRequest) (*pb.YourResponse, error) {
    // 구현 내용
}

func main() {
    lis, err := net.Listen("tcp", port)
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    s := grpc.NewServer()
    pb.RegisterYourServiceServer(s, &server{})
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
```

##### gRPC 클라이언트

```go
// client.go
package main

import (
    "context"
    "log"
    "time"

    pb "path/to/your/protobuf/package"

    "google.golang.org/grpc"
)

const (
    address     = "localhost:50051"
    defaultName = "world"
)

func main() {
    conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
    defer conn.Close()
    c := pb.NewYourServiceClient(conn)

    ctx, cancel := context.WithTimeout(context.Background(), time.Second)
    defer cancel()

    r, err := c.YourMethod(ctx, &pb.YourRequest{Name: defaultName})
    if err != nil {
        log.Fatalf("could not greet: %v", err)
    }
    log.Printf("Greeting: %s", r.GetMessage())
}
```

