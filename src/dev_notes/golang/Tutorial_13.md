### 데이터베이스와 ORM 사용법

오늘은 Go 언어에서 데이터베이스와 ORM(Object-Relational Mapping)을 사용하는 방법에 대해 학습하겠습니다. 주요 내용으로는 SQL 데이터베이스 연결, CRUD 작업, 트랜잭션 관리, GORM의 사용법, 데이터베이스 연결 풀링, 그리고 NoSQL 데이터베이스와의 연동 방법을 다루겠습니다.

### 1. SQL 데이터베이스 연결

Go에서 SQL 데이터베이스에 연결하는 방법을 알아보겠습니다. `database/sql` 패키지와 MySQL 드라이버를 사용합니다.

#### 데이터베이스 드라이버 설치

MySQL 드라이버를 설치합니다.

```sh
go get -u github.com/go-sql-driver/mysql
```

#### 데이터베이스 연결

MySQL 데이터베이스에 연결하는 예제입니다.

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    err = db.Ping()
    if err != nil {
        panic(err)
    }

    fmt.Println("Successfully connected to the database")
}
```

### 2. CRUD 작업

데이터베이스에서 기본적인 CRUD(Create, Read, Update, Delete) 작업을 수행하는 방법을 알아봅니다.

#### 데이터 삽입

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    query := "INSERT INTO users (name, age) VALUES (?, ?)"
    result, err := db.Exec(query, "John", 30)
    if err != nil {
        panic(err)
    }

    id, err := result.LastInsertId()
    if err != nil {
        panic(err)
    }

    fmt.Printf("Inserted user with ID: %d\n", id)
}
```

#### 데이터 조회

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

type User struct {
    ID   int
    Name string
    Age  int
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    query := "SELECT id, name, age FROM users WHERE id = ?"
    var user User
    err = db.QueryRow(query, 1).Scan(&user.ID, &user.Name, &user.Age)
    if err != nil {
        panic(err)
    }

    fmt.Printf("User: %+v\n", user)
}
```

#### 데이터 업데이트

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    query := "UPDATE users SET age = ? WHERE id = ?"
    result, err := db.Exec(query, 35, 1)
    if err != nil {
        panic(err)
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        panic(err)
    }

    fmt.Printf("Updated %d rows\n", rowsAffected)
}
```

#### 데이터 삭제

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    query := "DELETE FROM users WHERE id = ?"
    result, err := db.Exec(query, 1)
    if err != nil {
        panic(err)
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        panic(err)
    }

    fmt.Printf("Deleted %d rows\n", rowsAffected)
}
```

### 3. 트랜잭션 관리

트랜잭션을 사용하여 데이터베이스 작업의 원자성을 보장하는 방법을 알아봅니다.

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    tx, err := db.Begin()
    if err != nil {
        panic(err)
    }

    query1 := "INSERT INTO users (name, age) VALUES (?, ?)"
    _, err = tx.Exec(query1, "Alice", 28)
    if err != nil {
        tx.Rollback()
        panic(err)
    }

    query2 := "UPDATE users SET age = ? WHERE name = ?"
    _, err = tx.Exec(query2, 29, "Alice")
    if err != nil {
        tx.Rollback()
        panic(err)
    }

    err = tx.Commit()
    if err != nil {
        panic(err)
    }

    fmt.Println("Transaction committed successfully")
}
```

### 4. GORM 사용법

GORM은 Go에서 인기 있는 ORM 라이브러리입니다. GORM을 사용하면 SQL을 직접 작성하지 않고도 데이터베이스 작업을 수행할 수 있습니다.

#### GORM 설치

```sh
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

#### GORM 초기화 및 모델 정의

```go
package main

import (
    "fmt"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name string
    Age  int
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    db.AutoMigrate(&User{})

    user := User{Name: "John", Age: 30}
    result := db.Create(&user)
    if result.Error != nil {
        panic(result.Error)
    }

    fmt.Printf("Inserted user with ID: %d\n", user.ID)
}
```

#### GORM을 사용한 CRUD 작업

##### 데이터 삽입

```go
user := User{Name: "John", Age: 30}
db.Create(&user)
```

##### 데이터 조회

```go
var user User
db.First(&user, 1) // 기본 키로 조회
fmt.Printf("User: %+v\n", user)

var users []User
db.Where("age > ?", 25).Find(&users)
fmt.Printf("Users: %+v\n", users)
```

##### 데이터 업데이트

```go
db.Model(&user).Update("Age", 35)
db.Model(&user).Updates(User{Age: 36, Name: "John Doe"})
```

##### 데이터 삭제

```go
db.Delete(&user, 1)
```

### 5. 데이터베이스 연결 풀링

데이터베이스 연결 풀링을 사용하여 데이터베이스 연결을 효율적으로 관리하는 방법을 알아봅니다.

```go
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    db.SetMaxOpenConns(10)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(30 * time.Minute)

    err = db.Ping()
    if err != nil {
        panic(err)
    }

    fmt.Println("Successfully connected to the database with connection pooling")
}
```

### 6. GORM 고급 기능

GORM의 고급 기능을 활용하여 더 복잡한 데이터베이스 작업을 수행하는 방법을 알아봅니다.

#### 관계 설정

GORM을 사용하여 모델 간의

 관계를 설정하는 방법입니다.

```go
package main

import (
    "fmt"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name   string
    Age    int
    Orders []Order
}

type Order struct {
    gorm.Model
    UserID uint
    Amount float64
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    db.AutoMigrate(&User{}, &Order{})

    user := User{Name: "John", Age: 30, Orders: []Order{{Amount: 100.5}, {Amount: 200.75}}}
    db.Create(&user)

    var retrievedUser User
    db.Preload("Orders").First(&retrievedUser, user.ID)
    fmt.Printf("User: %+v\n", retrievedUser)
    for _, order := range retrievedUser.Orders {
        fmt.Printf("Order: %+v\n", order)
    }
}
```

#### 복합 키 (Composite Key) 사용

복합 키를 설정하는 방법입니다.

```go
package main

import (
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Code  string `gorm:"primaryKey"`
    Price uint
}

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/dbname"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic(err)
    }

    db.AutoMigrate(&Product{})

    product := Product{Code: "L1212", Price: 1000}
    db.Create(&product)
}
```

### 7. NoSQL 데이터베이스 연동

Go에서 NoSQL 데이터베이스를 사용하는 방법을 알아봅니다. 여기서는 MongoDB를 예로 들어 설명합니다.

#### MongoDB 드라이버 설치

MongoDB Go 드라이버를 설치합니다.

```sh
go get go.mongodb.org/mongo-driver/mongo
go get go.mongodb.org/mongo-driver/mongo/options
```

#### MongoDB 연결

MongoDB에 연결하고 기본적인 CRUD 작업을 수행하는 방법입니다.

```go
package main

import (
    "context"
    "fmt"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson"
)

type User struct {
    Name string
    Age  int
}

func main() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        panic(err)
    }
    defer client.Disconnect(context.TODO())

    collection := client.Database("testdb").Collection("users")

    // 데이터 삽입
    user := User{Name: "Alice", Age: 25}
    _, err = collection.InsertOne(context.TODO(), user)
    if err != nil {
        panic(err)
    }

    // 데이터 조회
    var result User
    filter := bson.D{{"name", "Alice"}}
    err = collection.FindOne(context.TODO(), filter).Decode(&result)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Found a single document: %+v\n", result)

    // 데이터 업데이트
    update := bson.D{{"$set", bson.D{{"age", 26}}}}
    _, err = collection.UpdateOne(context.TODO(), filter, update)
    if err != nil {
        panic(err)
    }

    // 데이터 삭제
    _, err = collection.DeleteOne(context.TODO(), filter)
    if err != nil {
        panic(err)
    }

    fmt.Println("CRUD operations completed successfully")
}
```

### Day 13 요약 (심화)

1. SQL 데이터베이스 연결
    - 데이터베이스 드라이버 설치
    - 데이터베이스 연결
2. CRUD 작업
    - 데이터 삽입
    - 데이터 조회
    - 데이터 업데이트
    - 데이터 삭제
3. 트랜잭션 관리
4. GORM 사용법
    - GORM 설치
    - GORM 초기화 및 모델 정의
    - GORM을 사용한 CRUD 작업
5. 데이터베이스 연결 풀링
6. GORM 고급 기능
    - 관계 설정
    - 복합 키 사용
7. NoSQL 데이터베이스 연동
    - MongoDB 드라이버 설치
    - MongoDB 연결 및 CRUD 작업