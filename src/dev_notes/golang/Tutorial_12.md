### 네트워킹과 보안

오늘은 Go 언어를 사용하여 네트워킹과 보안을 다루는 방법에 대해 학습하겠습니다. 주요 내용으로는 TLS 설정, 인증 및 인가, OAuth2 사용, 그리고 보안 모범 사례 등이 포함됩니다.

### 1. TLS 설정

TLS(Transport Layer Security)는 네트워크 통신을 암호화하여 데이터의 기밀성과 무결성을 보장합니다. Go는 표준 라이브러리를 통해 TLS를 쉽게 설정할 수 있습니다.

#### HTTP 서버에 TLS 설정

TLS 인증서를 생성하고 HTTP 서버에 설정하는 방법입니다.

##### 인증서 및 키 생성

`openssl`을 사용하여 자체 서명된 인증서와 키를 생성합니다.

```sh
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

##### TLS 서버 설정

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
    err := http.ListenAndServeTLS(":8443", "cert.pem", "key.pem", nil)
    if err != nil {
        fmt.Println(err)
    }
}
```

### 2. 인증 및 인가

애플리케이션에서 사용자 인증 및 인가를 구현하는 방법을 알아봅니다. 기본 인증, JWT(JSON Web Token) 등을 사용합니다.

#### 기본 인증

기본 인증을 사용하여 사용자를 인증하는 방법입니다.

```go
package main

import (
    "fmt"
    "net/http"
)

func BasicAuth(handler http.HandlerFunc, username, password string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        u, p, ok := r.BasicAuth()
        if !ok || u != username || p != password {
            w.Header().Set("WWW-Authenticate", `Basic realm="restricted"`)
            http.Error(w, "Unauthorized.", http.StatusUnauthorized)
            return
        }
        handler(w, r)
    }
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, Authenticated User!")
}

func main() {
    http.HandleFunc("/", BasicAuth(handler, "user", "pass"))
    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

#### JWT 인증

JWT를 사용하여 사용자를 인증하고 인가하는 방법입니다.

##### JWT 생성 및 검증

```go
package main

import (
    "fmt"
    "net/http"
    "time"

    "github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

type Claims struct {
    Username string `json:"username"`
    jwt.StandardClaims
}

func GenerateJWT(username string) (string, error) {
    expirationTime := time.Now().Add(5 * time.Minute)
    claims := &Claims{
        Username: username,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: expirationTime.Unix(),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(jwtKey)
}

func ValidateJWT(tokenStr string) (*Claims, error) {
    claims := &Claims{}
    token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })
    if err != nil {
        if err == jwt.ErrSignatureInvalid {
            return nil, err
        }
        return nil, err
    }
    if !token.Valid {
        return nil, err
    }
    return claims, nil
}

func main() {
    http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
        username := r.FormValue("username")
        password := r.FormValue("password")

        if username != "user" || password != "pass" {
            http.Error(w, "Invalid credentials", http.StatusUnauthorized)
            return
        }

        tokenString, err := GenerateJWT(username)
        if err != nil {
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }

        http.SetCookie(w, &http.Cookie{
            Name:    "token",
            Value:   tokenString,
            Expires: time.Now().Add(5 * time.Minute),
        })
    })

    http.HandleFunc("/welcome", func(w http.ResponseWriter, r *http.Request) {
        c, err := r.Cookie("token")
        if err != nil {
            if err == http.ErrNoCookie {
                http.Error(w, "Unauthorized", http.StatusUnauthorized)
                return
            }
            http.Error(w, "Bad Request", http.StatusBadRequest)
            return
        }

        claims, err := ValidateJWT(c.Value)
        if err != nil {
            if err == jwt.ErrSignatureInvalid {
                http.Error(w, "Unauthorized", http.StatusUnauthorized)
                return
            }
            http.Error(w, "Bad Request", http.StatusBadRequest)
            return
        }

        fmt.Fprintf(w, "Hello, %s!", claims.Username)
    })

    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

### 3. OAuth2 사용

OAuth2를 사용하여 외부 서비스와 인증을 연동하는 방법입니다. `golang.org/x/oauth2` 패키지를 사용합니다.

#### OAuth2 설정

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "os"

    "golang.org/x/oauth2"
    "golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
    RedirectURL:  "http://localhost:8080/callback",
    ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
    ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
    Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile"},
    Endpoint:     google.Endpoint,
}

var oauthStateString = "random"

func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
    url := googleOauthConfig.AuthCodeURL(oauthStateString)
    http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
    state := r.FormValue("state")
    if state != oauthStateString {
        http.Error(w, "State mismatch", http.StatusBadRequest)
        return
    }

    code := r.FormValue("code")
    token, err := googleOauthConfig.Exchange(context.Background(), code)
    if err != nil {
        http.Error(w, "Code exchange failed", http.StatusInternalServerError)
        return
    }

    client := googleOauthConfig.Client(context.Background(), token)
    resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
    if err != nil {
        http.Error(w, "Failed to get user info", http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    http.Redirect(w, r, "/", http.StatusSeeOther)
}

func main() {
    http.HandleFunc("/login", handleGoogleLogin)
    http.HandleFunc("/callback", handleGoogleCallback)

    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```

### 4. 보안 모범 사례

#### 입력 검증 및 인젝션 방지

입력 데이터를 검증하고 인젝션 공격을 방지하는 방법입니다. SQL 인젝션과 XSS(Cross-Site Scripting)를 방지합니다.

```go
// SQL 인젝션 방지
stmt, err := db.Prepare("SELECT * FROM users WHERE username = ?")
if err != nil {
    log.Fatal(err)
}
defer stmt.Close()

rows, err := stmt.Query(username)
if err != nil {
    log.Fatal(err)
}
defer rows.Close()
```

```go
// XSS 방지
import (
    "html/template"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    t, _ := template.New("webpage").Parse(`<html><body>{{.}}</body></html>`)
    t.Execute(w, template.HTML(r.FormValue("input")))
}
```

#### 보안 헤더 설정

HTTP 응답 헤더에 보안 설정을 추가하여 공격을 방지합니다.

```go
package main

import (
    "net/http"
)

func securityHeadersMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Security-Policy", "default-src 'self'")
        w.Header().Set("X-Content-Type-Options", "nosniff")
        w.Header().Set("X-Frame-Options", "DENY")
        w.Header().Set("X-XSS-Protection", "1; mode=block")
        next.ServeHTTP(w, r)
    })
}

func main() {
    http.Handle("/", securityHeadersMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, Secure World!"))
    })))

    fmt.Println("Starting server on :8080")
    http.ListenAndServe(":8080", nil)
}
```
