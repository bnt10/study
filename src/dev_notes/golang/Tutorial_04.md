### 구조체와 메서드

구조체와 메서드는 Go 언어에서 데이터를 구조화하고 객체지향 프로그래밍의 일부 개념을 구현하는 데 사용됩니다. 

#### 1. 구조체 정의

구조체(struct)는 여러 필드를 그룹화하는 데 사용됩니다. 각 필드는 이름과 타입을 가집니다.

```go
package main

import "fmt"

// Person 구조체 정의
type Person struct {
    name string
    age  int
}

func main() {
    // 구조체 인스턴스 생성 및 초기화
    var p1 Person
    p1.name = "Alice"
    p1.age = 30
    fmt.Println("Person 1:", p1)

    // 리터럴을 사용한 초기화
    p2 := Person{name: "Bob", age: 25}
    fmt.Println("Person 2:", p2)

    // 필드 순서에 따른 초기화
    p3 := Person{"Charlie", 35}
    fmt.Println("Person 3:", p3)
}
```

#### 2. 구조체의 필드 접근

구조체의 필드는 점(`.`) 연산자를 사용하여 접근할 수 있습니다.

```go
package main

import "fmt"

// Book 구조체 정의
type Book struct {
    title  string
    author string
    pages  int
}

func main() {
    // Book 구조체 인스턴스 생성 및 초기화
    b := Book{title: "Go Programming", author: "John Doe", pages: 300}
    fmt.Println("Book:", b)

    // 필드 접근 및 수정
    b.pages = 350
    fmt.Println("Updated Book:", b)
}
```

#### 3. 메서드 정의

메서드는 특정 타입에 연결된 함수입니다. 메서드는 구조체를 리시버(receiver)로 사용하여 정의됩니다.

```go
package main

import "fmt"

// Rect 구조체 정의
type Rect struct {
    width, height int
}

// 면적을 계산하는 메서드 정의
func (r Rect) area() int {
    return r.width * r.height
}

func main() {
    rect := Rect{10, 5}
    fmt.Println("Area:", rect.area()) // Area: 50
}
```

#### 4. 리시버 타입

리시버는 값 타입 또는 포인터 타입으로 정의할 수 있습니다.

- 값 타입 리시버: 리시버 구조체의 복사본을 사용합니다.
- 포인터 타입 리시버: 리시버 구조체의 원본을 사용합니다.

```go
package main

import "fmt"

// Circle 구조체 정의
type Circle struct {
    radius float64
}

// 값 타입 리시버 메서드
func (c Circle) area() float64 {
    return 3.14 * c.radius * c.radius
}

// 포인터 타입 리시버 메서드
func (c *Circle) setRadius(r float64) {
    c.radius = r
}

func main() {
    c := Circle{5}
    fmt.Println("Area:", c.area()) // Area: 78.5

    c.setRadius(10)
    fmt.Println("Updated Area:", c.area()) // Updated Area: 314
}
```

### 값 타입과 포인터 타입 리시버 사용 시기

#### 값 타입 리시버를 사용할 때

1. **리시버의 크기가 작을 때**: 작은 구조체는 복사 비용이 적기 때문에 값 타입 리시버를 사용하는 것이 좋습니다. 예를 들어, 두 개의 정수 필드를 가진 구조체 등.
2. **변경이 필요 없을 때**: 메서드가 리시버를 변경하지 않아야 하는 경우 값 타입 리시버를 사용합니다. 읽기 전용 메서드에 적합합니다.

#### 포인터 타입 리시버를 사용할 때

1. **리시버의 크기가 클 때**: 큰 구조체를 복사하면 성능에 영향을 미칠 수 있으므로, 포인터 타입 리시버를 사용하는 것이 효율적입니다.
2. **리시버를 변경해야 할 때**: 메서드가 리시버의 필드를 변경해야 하는 경우 포인터 타입 리시버를 사용합니다. 예를 들어, 구조체의 값을 업데이트하는 메서드 등.
3. **일관성을 유지하고자 할 때**: 모든 메서드에서 일관되게 포인터 타입 리시버를 사용하는 것이 코드 가독성을 높이고, 실수를 줄이는 데 도움이 됩니다.

#### 5. 구조체 임베딩

구조체 임베딩은 한 구조체 안에 다른 구조체를 포함시켜 재사용성을 높이는 기능입니다.

```go
package main

import "fmt"

// 구조체 정의
type Person struct {
    name string
    age  int
}

type Employee struct {
    Person
    position string
}

func main() {
    e := Employee{
        Person:   Person{name: "Alice", age: 30},
        position: "Manager",
    }
    fmt.Println("Employee:", e)
    fmt.Println("Name:", e.name) // 임베딩된 필드에 접근
}
```

#### 6. 구조체와 JSON 변환

구조체는 JSON 형식으로 변환하거나 JSON 형식을 구조체로 변환하는 데 사용될 수 있습니다. 이를 위해 `encoding/json` 패키지를 사용합니다.

```go
package main

import (
    "encoding/json"
    "fmt"
)

// 구조체 정의
type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "Bob", Age: 25}

    // 구조체를 JSON으로 변환
    jsonData, err := json.Marshal(p)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("JSON Data:", string(jsonData))

    // JSON을 구조체로 변환
    var p2 Person
    jsonStr := `{"name": "Charlie", "age": 35}`
    err = json.Unmarshal([]byte(jsonStr), &p2)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Struct Data:", p2)
}
```

#### 7. 구조체 초기화와 생성자 함수

구조체를 초기화할 때 여러 가지 방법이 있습니다. Go에서는 생성자 함수 패턴을 사용하여 구조체를 초기화할 수 있습니다.

```go
package main

import "fmt"

// 구조체 정의
type Person struct {
    name string
    age  int
}

// 생성자 함수
func NewPerson(name string, age int) *Person {
    return &Person{name: name, age: age}
}

func main() {
    // 생성자 함수를 사용한 초기화
    p := NewPerson("Alice", 30)
    fmt.Println("Person:", p)
}
```

#### 8. 구조체의 비교

구조체는 비교 연산자(`==`, `!=`)를 사용하여 비교할 수 있습니다. 단, 모든 필드가 비교 가능해야 합니다.

```go
package main

import "fmt"

// 구조체 정의
type Point struct {
    x, y int
}

func main() {
    p1 := Point{1, 2}
    p2 := Point{1, 2}
    p3 := Point{2, 3}

    fmt.Println("p1 == p2:", p1 == p2) // p1 == p2: true
    fmt.Println("p1 == p3:", p1 == p3) // p1 == p3: false
}
```

#### 9. 구조체의 복사

구조체를 다른 변수에 할당하면 값이 복사됩니다. 이때 두 변수는 서로 다른 메모리를 참조합니다.

```go
package main

import "fmt"

// 구조체 정의
type Rect struct {
    width, height int
}

func main() {
    r1 := Rect{10, 20}
    r2 := r1  // r1의 값을 r2에 복사
    r2.width = 30

    fmt.Println("r1:", r1) // r1: {10 20}
    fmt.Println("r2:", r2) // r2: {30 20}
}
```

#### 10. 메서드 체이닝

메서드 체이닝을 사용하면 여러 메서드를 연속적으로 호출할 수 있습니다. 이는 메서드가 자신을 반환하게 함으로써 가능합니다.

```go
package main

import "fmt"

// 구조체 정의
type Builder struct {
    value string
}

// 메서드 정의
func (b *Builder) Add(str string) *Builder {
    b.value += str
    return b
}

func (b *Builder) String() string {
    return b.value
}

func main() {
    b := &Builder{}
    result := b.Add("Hello, ").Add("World!").String()
    fmt.Println("Result:", result) // Result: Hello, World!
}
```

