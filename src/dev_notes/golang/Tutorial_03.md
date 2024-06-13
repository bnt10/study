# Go 언어의 함수 사용법: 기본부터 고급 기능까지

함수는 Go에서 코드 재사용성을 높이고 모듈화된 프로그램을 작성하는 데 필수적인 요소입니다. 이번 포스팅에서는 Go에서 함수의 기본 사용법부터 고급 기능까지 살펴보겠습니다.

## 1. 함수 정의 및 호출

Go에서 함수를 정의하는 기본 형식은 다음과 같습니다:

```go
func 함수이름(매개변수 목록) (반환값 목록) {
    // 함수 본문
    return 반환값
}
```

예를 들어, 두 정수를 더하는 함수를 정의하고 호출하는 방법은 다음과 같습니다:

```go
package main

import "fmt"

// 두 정수를 더하는 함수
func add(a int, b int) int {
    return a + b
}

func main() {
    result := add(3, 4)
    fmt.Println("Result:", result) // Result: 7
}
```

## 2. 여러 값을 반환하는 함수

Go 함수는 여러 값을 반환할 수 있습니다. 이 기능은 에러 처리나 부가적인 정보를 반환할 때 유용합니다.

```go
package main

import "fmt"

// 두 값을 더하고, 차를 반환하는 함수
func addAndSubtract(a int, b int) (int, int) {
    return a + b, a - b
}

func main() {
    sum, diff := addAndSubtract(7, 3)
    fmt.Println("Sum:", sum)      // Sum: 10
    fmt.Println("Difference:", diff) // Difference: 4
}
```

## 3. 가변 인자 함수

가변 인자 함수는 매개변수의 개수가 가변적인 함수를 정의할 때 사용합니다. `...`을 사용하여 가변 인자를 정의할 수 있습니다.

```go
package main

import "fmt"

// 여러 개의 정수 값을 더하는 가변 인자 함수
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}

func main() {
    fmt.Println("Sum:", sum(1, 2, 3))          // Sum: 6
    fmt.Println("Sum:", sum(4, 5, 6, 7, 8))    // Sum: 30
}
```

## 4. 함수 타입과 변수

Go에서 함수는 일급 시민으로, 함수를 변수에 할당하거나 다른 함수의 매개변수로 전달할 수 있습니다.

```go
package main

import "fmt"

// 두 정수를 더하는 함수
func add(a int, b int) int {
    return a + b
}

func main() {
    var operation func(int, int) int
    operation = add
    result := operation(3, 4)
    fmt.Println("Result:", result) // Result: 7
}
```

## 5. 익명 함수와 클로저

익명 함수는 이름이 없는 함수로, 주로 클로저를 생성하는 데 사용됩니다. 클로저는 함수 외부에 있는 변수를 참조하는 함수입니다.

```go
package main

import "fmt"

func main() {
    // 익명 함수 정의 및 호출
    func() {
        fmt.Println("Hello, World!")
    }()

    // 클로저 예제
    add := func(a int, b int) int {
        return a + b
    }
    fmt.Println("Sum:", add(3, 4)) // Sum: 7

    // 클로저를 사용하는 함수
    counter := func() func() int {
        count := 0
        return func() int {
            count++
            return count
        }
    }

    c := counter()
    fmt.Println("Count:", c()) // Count: 1
    fmt.Println("Count:", c()) // Count: 2
}
```

## 6. 재귀 함수

Go는 재귀 함수를 지원합니다. 재귀 함수는 자기 자신을 호출하는 함수입니다.

```go
package main

import "fmt"

// 팩토리얼을 계산하는 재귀 함수
func factorial(n int) int {
    if n == 0 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println("Factorial of 5:", factorial(5)) // Factorial of 5: 120
}
```

## 7. 함수에서의 defer, panic, recover

Go에서는 `defer`, `panic`, `recover`를 사용하여 에러 처리를 할 수 있습니다. `defer`는 함수가 종료될 때 실행될 함수를 지정합니다.

```go
package main

import "fmt"

// 패닉과 복구를 이용한 에러 처리 예제
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from:", r)
        }
    }()
    
    fmt.Println("Starting program")
    panic("Something went wrong!")
    fmt.Println("Ending program") // 실행되지 않음
}
```

## 8. 네임드 반환 값

함수의 반환 값에 이름을 지정할 수 있습니다. 이는 주로 함수가 길고 반환 값이 여러 개인 경우 코드의 가독성을 높이는 데 사용됩니다.

```go
package main

import "fmt"

// 네임드 반환 값을 사용하는 함수
func divide(a int, b int) (quotient int, remainder int) {
    quotient = a / b
    remainder = a % b
    return
}

func main() {
    q, r := divide(10, 3)
    fmt.Println("Quotient:", q)    // Quotient: 3
    fmt.Println("Remainder:", r)   // Remainder: 1
}
```

## 9. 일급 함수와 함수 리터럴

Go의 함수는 일급 시민(first-class citizen)입니다. 이는 함수가 변수에 할당될 수 있고, 다른 함수의 매개변수로 전달되거나 반환 값으로 사용할 수 있음을 의미합니다.

```go
package main

import "fmt"

func main() {
    // 함수 리터럴을 변수에 할당
    square := func(x int) int {
        return x * x
    }

    fmt.Println("Square of 4:", square(4)) // Square of 4: 16

    // 함수를 매개변수로 받는 함수
    applyFunc := func(f func(int) int, v int) int {
        return f(v)
    }

    fmt.Println("Apply square to 5:", applyFunc(square, 5)) // Apply square to 5: 25
}
```

## 10. 메서드

Go에서는 메서드를 정의할 수 있습니다. 메서드는 특정 타입과 연결된 함수입니다. 메서드는 함수와 동일하게 정의되지만, 특별한 리시버(receiver)를 사용합니다.

```go
package main

import "fmt"

// Rect 구조체 정의
type Rect struct {
    width, height int
}

// 메서드 정의
func (r Rect) area() int {
    return r.width * r.height
}

func main() {
    rect := Rect{10, 5}
    fmt.Println("Area:", rect.area()) // Area: 50
}
```

## 맺음말

이번 포스팅에서는 Go 언어에서 함수의 기본 사용법부터 고급 기능까지 살펴보았습니다. 함수는 코드의 재사용성을 높이고 모듈화된 프로그램을 작성하는 데 중요한 역할을 합니다. 다양한 함수 사용 방법을 익히고 적절히 활용하여 더 나은 Go 프로그램을 작성해 보세요.

다음 시간에는 더 심화된 Go 언어의 기능에 대해 알아보겠습니다. 많은 관심 부탁드립니다!