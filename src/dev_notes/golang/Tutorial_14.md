### HTTP 서버와 미들웨어

오늘은 Go 언어로 HTTP 서버를 구현하고 미들웨어를 사용하는 방법에 대해 학습하겠습니다. 주요 내용으로는 고급 라우팅, 미들웨어 패턴, 컨텍스트(Context) 사용법, 파일 서버, 그리고 HTTP/2 설정 등이 포함됩니다. 특히, 컨텍스트(Context)에 대해 더 자세히 알아보겠습니다.

### 1. 라우팅

라우팅을 구현하기 위해 `gorilla/mux` 패키지를 사용할 수 있습니다.

#### Gorilla Mux 설치

```sh
go get -u github.com/gorilla/mux
```

#### 기본 라우팅 설정

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
    fmt.Println("Starting server on :8080")
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

#### 경로 변수와 쿼리 매개변수

경로 변수와 쿼리 매개변수를 사용하는 방법입니다.

```go
func main() {
    r := mux.NewRouter()
    r.HandleFunc("/products/{id}", ProductHandler).Methods("GET")

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func ProductHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    productID := vars["id"]
    fmt.Fprintf(w, "Product ID: %s", productID)
}
```

### 2. 미들웨어 패턴

미들웨어를 사용하여 HTTP 요청과 응답을 처리하는 방법을 알아봅니다.

#### 기본 미들웨어 작성

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("Request URI: %s\n", r.RequestURI)
        next.ServeHTTP(w, r)
    })
}

func main() {
    r := mux.NewRouter()
    r.Use(loggingMiddleware)
    r.HandleFunc("/", HomeHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to the Home Page!")
}
```

#### 체인 미들웨어

여러 미들웨어를 체인으로 연결하는 방법입니다.

```go
func main() {
    r := mux.NewRouter()
    r.Use(loggingMiddleware)
    r.Use(authenticationMiddleware)
    r.HandleFunc("/", HomeHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func authenticationMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token != "valid-token" {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

### 3. 컨텍스트(Context) 사용법

컨텍스트를 사용하여 요청 범위 내에서 데이터를 전달하고 취소 신호를 관리하는 방법을 알아봅니다. Go의 `context` 패키지는 고루틴 간의 취소 신호를 전달하고, 요청 범위 데이터를 저장 및 전달하는 데 유용합니다.

#### 컨텍스트 생성 및 전달

컨텍스트를 생성하고 전달하는 방법을 알아봅니다.

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/user/{id}", UserHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    userID := vars["id"]

    ctx := context.WithValue(r.Context(), "userID", userID)
    r = r.WithContext(ctx)

    processRequest(w, r)
}

func processRequest(w http.ResponseWriter, r *http.Request) {
    userID := r.Context().Value("userID").(string)
    fmt.Fprintf(w, "User ID: %s", userID)
}
```

#### 요청 취소 신호 처리

요청이 취소되었을 때 이를 처리하는 방법입니다.

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/long-running", LongRunningHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func LongRunningHandler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    done := make(chan struct{})

    go func() {
        time.Sleep(5 * time.Second)
        close(done)
    }()

    select {
    case <-ctx.Done():
        http.Error(w, "Request cancelled", http.StatusRequestTimeout)
        return
    case <-done:
        fmt.Fprintf(w, "Completed long-running request")
    }
}
```

#### 컨텍스트와 타임아웃

컨텍스트에 타임아웃을 설정하여 요청이 일정 시간 내에 완료되지 않으면 자동으로 취소되도록 할 수 있습니다.

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/timeout", TimeoutHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func TimeoutHandler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
    defer cancel()

    done := make(chan struct{})

    go func() {
        time.Sleep(3 * time.Second)
        close(done)
    }()

    select {
    case <-ctx.Done():
        http.Error(w, "Request timed out", http.StatusRequestTimeout)
        return
    case <-done:
        fmt.Fprintf(w, "Request completed successfully")
    }
}
```

#### context.Background

`context.Background`는 루트 컨텍스트를 생성하는 데 사용됩니다. 이는 컨텍스트의 최상위 부모로 사용되며, 주로 메인 함수, 초기화 함수 또는 테스트 코드에서 사용됩니다.

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx := context.Background()
    ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
    defer cancel()

    process(ctx)
}

func process(ctx context.Context) {
    select {
    case <-time.After(1 * time.Second):
        fmt.Println("Processed request")
    case <-ctx.Done():
        fmt.Println("Request timed out")
    }
}
```

#### 컨텍스트를 사용한 고루틴 제어

컨텍스트를 사용하여 고루틴을 제어하는 방법을 알아봅니다. 컨텍스트를 사용하면 고루틴을 취소하거나 타임아웃을 설정할 수 있습니다.

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    go func(ctx context.Context) {
        for {
            select {
            case <-ctx.Done():
                fmt.Println("Goroutine cancelled")
                return
            default:
                fmt.Println("Goroutine running")
                time.Sleep(1 * time.Second)
            }
        }
    }(ctx)

    time.Sleep(5 * time.Second)
    cancel()
    time.Sleep(1 * time.Second)
    fmt.Println("Main function completed")
}
```

#### 컨텍스트 사용 예시

컨텍스트를 사용하는 예시를 살펴보겠습니다. 여기서는 데이터베이스 쿼리와 HTTP 요청을 동시에 처리하는 예시를 보여드립니다.

```go
package main

import (
    "context"
    "database/sql"
    "fmt"
    "log"
    "net/http"
    "time"

    _ "github.com/go-sql-driver/mysql"
    "github.com/gorilla/mux"
)

var db *sql.DB

func init() {
    var err error
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err = sql.Open("mysql", dsn)
    if err != nil {


        log.Fatalf("Failed to connect to database: %v", err)
    }
    if err = db.Ping(); err != nil {
        log.Fatalf("Failed to ping database: %v", err)
    }
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/data/{id}", DataHandler)

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}

func DataHandler(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]

    // 컨텍스트에 타임아웃 설정
    ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
    defer cancel()

    // 데이터베이스 쿼리를 실행하는 고루틴
    resultChan := make(chan string)
    errChan := make(chan error)
    go fetchData(ctx, id, resultChan, errChan)

    select {
    case <-ctx.Done():
        http.Error(w, "Request timed out", http.StatusRequestTimeout)
    case result := <-resultChan:
        fmt.Fprintf(w, "Data: %s", result)
    case err := <-errChan:
        http.Error(w, fmt.Sprintf("Failed to fetch data: %v", err), http.StatusInternalServerError)
    }
}

func fetchData(ctx context.Context, id string, resultChan chan<- string, errChan chan<- error) {
    query := "SELECT data FROM my_table WHERE id = ?"
    var data string
    if err := db.QueryRowContext(ctx, query, id).Scan(&data); err != nil {
        if err == sql.ErrNoRows {
            errChan <- fmt.Errorf("no data found for id %s", id)
        } else {
            errChan <- err
        }
        return
    }
    resultChan <- data
}
```

### 4. 파일 서버

정적 파일을 제공하는 파일 서버를 설정하는 방법을 알아봅니다.

```go
func main() {
    r := mux.NewRouter()
    r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

    http.Handle("/", r)
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

### 5. HTTP/2 설정

HTTP/2를 사용하여 서버의 성능을 향상시키는 방법을 알아봅니다.

#### HTTP/2 서버 설정

```go
package main

import (
    "fmt"
    "net/http"
    "golang.org/x/net/http2"
)

func main() {
    server := &http.Server{
        Addr: ":8443",
    }

    http2.ConfigureServer(server, &http2.Server{})

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, HTTP/2!")
    })

    fmt.Println("Starting HTTP/2 server on :8443")
    server.ListenAndServeTLS("cert.pem", "key.pem")
}
```
