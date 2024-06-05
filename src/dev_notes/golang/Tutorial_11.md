### 고급 Go 프로그래밍 기법

이번에는 Go 언어의 고급 프로그래밍 기법에 대해 학습하겠습니다. 오늘의 주제는 인터페이스 활용, 리플렉션(reflection), 제네릭 프로그래밍, 그리고 동시성 패턴입니다.

### 1. 인터페이스 활용

인터페이스는 Go 언어의 핵심 기능 중 하나로, 다양한 타입에 대한 공통된 동작을 정의합니다.

#### 인터페이스 정의 및 구현

```go
package main

import "fmt"

// 인터페이스 정의
type Speaker interface {
    Speak() string
}

// 타입 정의
type Person struct {
    Name string
}

func (p Person) Speak() string {
    return "Hello, my name is " + p.Name
}

type Dog struct {
    Name string
}

func (d Dog) Speak() string {
    return "Woof! My name is " + d.Name
}

func main() {
    var s Speaker

    s = Person{Name: "Alice"}
    fmt.Println(s.Speak())

    s = Dog{Name: "Buddy"}
    fmt.Println(s.Speak())
}
```

#### 빈 인터페이스와 타입 어설션

빈 인터페이스는 모든 타입을 담을 수 있습니다.

```go
package main

import "fmt"

func describe(i interface{}) {
    fmt.Printf("(%v, %T)\n", i, i)
}

func main() {
    var i interface{}
    describe(i)

    i = 42
    describe(i)

    i = "hello"
    describe(i)
}

// 타입 어설션
func main() {
    var i interface{} = "hello"

    s, ok := i.(string)
    fmt.Println(s, ok)

    f, ok := i.(float64)
    fmt.Println(f, ok)

    // 타입 어설션 실패시 패닉 발생
    f = i.(float64) // panic
    fmt.Println(f)
}
```

### 2. 리플렉션 (Reflection)

리플렉션은 런타임에 타입을 검사하고 조작하는 기능을 제공합니다. `reflect` 패키지를 사용합니다.

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var x float64 = 3.4
    v := reflect.ValueOf(x)

    fmt.Println("type:", v.Type())
    fmt.Println("kind:", v.Kind())
    fmt.Println("value:", v.Float())

    // 값 수정
    var y float64 = 3.4
    p := reflect.ValueOf(&y).Elem()
    p.SetFloat(7.1)
    fmt.Println(y)
}
```

### 3. 제네릭 프로그래밍 (Generics)

Go 1.18부터 제네릭을 지원합니다. 제네릭을 사용하면 타입을 매개변수로 사용하는 함수를 정의할 수 있습니다.

#### 제네릭 함수

```go
package main

import "fmt"

func Print[T any](s []T) {
    for _, v := range s {
        fmt.Println(v)
    }
}

func main() {
    Print([]int{1, 2, 3})
    Print([]string{"a", "b", "c"})
}
```

#### 제네릭 타입

```go
package main

import "fmt"

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() T {
    if len(s.items) == 0 {
        var zero T
        return zero
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item
}

func main() {
    var intStack Stack[int]
    intStack.Push(1)
    intStack.Push(2)
    fmt.Println(intStack.Pop())
    fmt.Println(intStack.Pop())

    var stringStack Stack[string]
    stringStack.Push("a")
    stringStack.Push("b")
    fmt.Println(stringStack.Pop())
    fmt.Println(stringStack.Pop())
}
```

### 4. 동시성 패턴

고루틴과 채널을 활용한 고급 동시성 패턴을 학습합니다.

#### 파이프라인 패턴

파이프라인 패턴은 데이터를 단계별로 처리하는 데 유용합니다.

```go
package main

import (
    "fmt"
)

func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func sq(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    nums := gen(2, 3, 4)
    results := sq(nums)

    for n := range results {
        fmt.Println(n)
    }
}
```

#### 팬아웃 및 팬인 패턴

팬아웃과 팬인은 작업을 병렬로 처리하고 결과를 수집하는 데 유용합니다.

```go
package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d started job %d\n", id, j)
        results <- j * 2
        fmt.Printf("Worker %d finished job %d\n", id, j)
    }
}

func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    var wg sync.WaitGroup
    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            worker(id, jobs, results)
        }(w)
    }

    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    wg.Wait()
    close(results)

    for result := range results {
        fmt.Println("Result:", result)
    }
}
```

