### 동시성 프로그래밍

Go 언어는 동시성 프로그래밍을 위한 강력한 지원을 제공합니다. Go의 고루틴(goroutine)과 채널(channel)은 효율적이고 간편하게 동시성 프로그래밍을 구현할 수 있도록 해줍니다. 오늘은 Go의 동시성 프로그래밍에 대해 학습하겠습니다.

#### 1. 고루틴

고루틴은 Go에서 동시성을 수행하는 경량 스레드입니다. 고루틴은 `go` 키워드를 사용하여 생성할 수 있습니다.

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // 고루틴 시작
    say("hello")    // 메인 고루틴
}
```

위 예제에서 `say("world")`는 새로운 고루틴으로 실행되고, `say("hello")`는 메인 고루틴에서 실행됩니다. 두 고루틴은 동시적으로 실행됩니다.

#### 2. 채널

채널은 고루틴 간에 데이터를 전달하는데 사용됩니다. 채널을 사용하면 고루틴 간의 통신을 안전하게 관리할 수 있습니다.

```go
package main

import "fmt"

func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // 채널에 데이터 전송
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}

    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    x, y := <-c, <-c // 채널로부터 데이터 수신

    fmt.Println(x, y, x+y)
}
```

위 예제에서는 두 고루틴이 각각 절반씩 배열의 합계를 계산하고, 결과를 채널을 통해 메인 고루틴으로 전달합니다.

#### 3. 버퍼링된 채널

채널은 버퍼링될 수 있습니다. 버퍼링된 채널은 송신자가 수신자가 받을 준비가 될 때까지 기다리지 않고 데이터를 보낼 수 있게 합니다.

```go
package main

import "fmt"

func main() {
    ch := make(chan int, 2)
    ch <- 1
    ch <- 2
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
```

위 예제에서 `make(chan int, 2)`는 버퍼 크기가 2인 채널을 생성합니다. 두 개의 값을 버퍼에 저장할 수 있습니다.

#### 4. 채널 닫기

채널을 닫으면 더 이상 데이터를 송신할 수 없지만, 채널에서 수신하는 것은 가능합니다. 채널을 닫는 것은 주로 송신자 측에서 수행합니다.

```go
package main

import "fmt"

func main() {
    c := make(chan int, 10)
    go func() {
        for i := 0; i < 10; i++ {
            c <- i
        }
        close(c)
    }()
    for i := range c {
        fmt.Println(i)
    }
}
```

위 예제에서 `close(c)`는 채널 `c`를 닫습니다. 수신자는 `range` 루프를 통해 채널에서 데이터를 수신할 수 있으며, 채널이 닫히면 루프가 종료됩니다.

#### 5. select 문

`select` 문은 여러 채널 연산을 대기하고, 준비된 채널 연산을 실행합니다.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    c2 := make(chan string)

    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "one"
    }()
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "two"
    }()

    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("Received", msg1)
        case msg2 := <-c2:
            fmt.Println("Received", msg2)
        }
    }
}
```

위 예제에서 `select` 문은 `c1`과 `c2` 채널 중 먼저 데이터를 수신하는 채널을 선택하여 해당 코드를 실행합니다.

#### 6. 고루틴 누수 방지

고루틴은 메모리 누수를 일으킬 수 있으므로, 사용 후 적절히 종료시켜야 합니다. 일반적으로 채널을 통해 종료 신호를 보내 고루틴을 종료시킵니다.

```go
package main

import (
    "fmt"
    "time"
)

func worker(done chan bool) {
    fmt.Println("working...")
    time.Sleep(time.Second)
    fmt.Println("done")
    done <- true
}

func main() {
    done := make(chan bool, 1)
    go worker(done)
    <-done
}
```

위 예제에서 `worker` 고루틴은 작업을 마친 후 `done` 채널에 `true`를 전송하여 메인 고루틴에 작업 완료를 알립니다.

#### 7. 타임아웃

`select` 문을 사용하여 타임아웃을 구현할 수 있습니다. 이는 고루틴이 일정 시간 내에 응답하지 않을 경우에 대응할 수 있게 합니다.

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    c := make(chan int, 1)
    go func() {
        time.Sleep(2 * time.Second)
        c <- 1
    }()

    select {
    case res := <-c:
        fmt.Println(res)
    case <-time.After(1 * time.Second):
        fmt.Println("timeout")
    }
}
```

위 예제에서 `time.After(1 * time.Second)`는 1초 후에 타임아웃 신호를 보내 `select` 문이 이를 처리하도록 합니다.

#### 8. Fan-in 및 Fan-out 패턴

Fan-in과 Fan-out 패턴은 여러 고루틴을 사용하여 작업을 분산하거나 집계하는 데 유용합니다.

##### Fan-out
여러 고루틴이 동시에 작업을 수행합니다.

```go
package main

import (
    "fmt"
    "sync"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d starting\n", id)
    // 작업 수행
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
}
```

##### Fan-in
여러 소스로부터 데이터를 수집하여 단일 채널로 전달합니다.

```go
package main

import (
    "fmt"
    "time"
)

func producer(id int, c chan<- int) {
    for i := 0; i < 5; i++ {
        c <- id*10 + i
        time.Sleep(time.Millisecond * 100)
    }
}

func main() {
    c := make(chan int)
    for i := 1; i <= 3; i++ {
        go producer(i, c)
    }

    for i := 0; i < 15; i++ {
        fmt.Println(<-c)
    }
}
```

#### 9. 컨텍스트(Context) 패키지

`context` 패키지는 고루틴의 실행을 제어하고 취소하는 데 사용됩니다. 주로 타임아웃, 취소 신호 전파 등에 사용됩니다.

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
    defer cancel()

    go func() {
        <-ctx.Done()
        fmt.Println("Context cancelled:", ctx.Err())
    }()

    time.Sleep(3 * time.Second)
}
```
