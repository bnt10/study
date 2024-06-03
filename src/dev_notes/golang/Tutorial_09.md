### 동시성 패턴 및 기법

Go 언어는 고루틴과 채널을 사용하여 동시성을 쉽게 구현할 수 있도록 강력한 지원을 제공합니다. 오늘은 Go에서 고급 동시성 패턴과 기법을 학습하겠습니다. 주요 내용으로는 동시성 패턴, sync 패키지, context 패키지의 심화 사용법 등이 포함됩니다.

#### 1. 고루틴 풀 (Goroutine Pool)

고루틴 풀은 다수의 고루틴을 미리 생성해두고 작업을 할당하는 방식으로, 많은 고루틴 생성에 따른 오버헤드를 줄이고자 할 때 유용합니다.

##### 언제 사용하면 유용한가?
- 많은 양의 작업을 동시에 처리해야 할 때.
- 고루틴 생성과 소멸에 따른 오버헤드를 줄이고자 할 때.
- 제한된 수의 고루틴을 사용하여 시스템 리소스를 효율적으로 사용하고자 할 때.

##### 실제 사용했을 때의 우위
- **효율적인 리소스 사용**: 고루틴을 미리 생성해두고 재사용하므로 고루틴 생성 및 소멸에 따른 비용이 줄어듭니다.
- **예측 가능한 성능**: 고루틴 수를 제한하여 과도한 고루틴 생성으로 인한 시스템 자원 낭비를 방지할 수 있습니다.
- **간단한 동시성 관리**: 작업 큐와 고루틴 풀을 사용하여 작업을 관리함으로써 동시성 코드를 더 쉽게 이해하고 유지보수할 수 있습니다.

##### 고루틴 풀 예시

다음은 고루틴 풀을 사용하여 작업을 처리하는 예제입니다.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

// WorkerPool 구조체 정의
type WorkerPool struct {
    jobs    chan int
    results chan int
    wg      sync.WaitGroup
}

// WorkerPool 생성자 함수
func NewWorkerPool(numWorkers int) *WorkerPool {
    wp := &WorkerPool{
        jobs:    make(chan int, 100),
        results: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        wp.wg.Add(1)
        go wp.worker(i)
    }
    return wp
}

// worker 함수 정의
func (wp *WorkerPool) worker(id int) {
    defer wp.wg.Done()
    for job := range wp.jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(time.Second) // 작업 처리 시뮬레이션
        wp.results <- job * 2
    }
}

// AddJob 함수 정의
func (wp *WorkerPool) AddJob(job int) {
    wp.jobs <- job
}

// CloseJobs 함수 정의
func (wp *WorkerPool) CloseJobs() {
    close(wp.jobs)
}

// Wait 함수 정의
func (wp *WorkerPool) Wait() {
    wp.wg.Wait()
    close(wp.results)
}

func main() {
    wp := NewWorkerPool(3) // 3개의 고루틴을 가진 고루틴 풀 생성

    // 10개의 작업 추가
    for i := 1; i <= 10; i++ {
        wp.AddJob(i)
    }

    wp.CloseJobs()
    wp.Wait()

    // 결과 출력
    for result := range wp.results {
        fmt.Println("Result:", result)
    }
}
```

위 예제에서는 `WorkerPool` 구조체를 정의하고, `NewWorkerPool` 함수로 고루틴 풀을 생성합니다. 각 작업은 `AddJob` 함수를 통해 추가되며, `CloseJobs` 함수를 호출하여 더 이상 작업을 받지 않음을 알립니다. `Wait` 함수를 호출하여 모든 작업이 완료될 때까지 기다린 후 결과를 처리합니다.

### 고루틴 풀 실제 사용 예시

다음은 고루틴 풀을 실제로 사용하는 시나리오 예시입니다. 여기서는 대규모 이미지 처리 작업을 병렬로 수행하는 예시를 살펴보겠습니다.

#### 이미지 처리 작업을 위한 고루틴 풀

가정: 대규모 이미지 파일들을 동시에 처리해야 하는 상황.

##### 1. 이미지 처리 함수 정의

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

// 이미지 처리 함수 (여기서는 단순히 슬립으로 시뮬레이션)
func processImage(imageID int) {
    fmt.Printf("Processing image %d\n", imageID)
    time.Sleep(2 * time.Second) // 이미지 처리 시뮬레이션
    fmt.Printf("Finished processing image %d\n", imageID)
}
```

##### 2. WorkerPool 구조체 정의 및 구현

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

type WorkerPool struct {
    jobs    chan int
    wg      sync.WaitGroup
}

func NewWorkerPool(numWorkers int) *WorkerPool {
    wp := &WorkerPool{
        jobs: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        wp.wg.Add(1)
        go wp.worker(i)
    }
    return wp
}

func (wp *WorkerPool) worker(id int) {
    defer wp.wg.Done()
    for job := range wp.jobs {
        processImage(job)
    }
}

func (wp *WorkerPool) AddJob(job int) {
    wp.jobs <- job
}

func (wp *WorkerPool) CloseJobs() {
    close(wp.jobs)
}

func (wp *WorkerPool) Wait() {
    wp.wg.Wait()
}

func main() {
    wp := NewWorkerPool(5) // 5개의 고루틴을 가진 고루틴 풀 생성

    // 20개의 이미지 처리 작업 추가
    for i := 1; i <= 20; i++ {
        wp.AddJob(i)
    }

    wp.CloseJobs()
    wp.Wait()

    fmt.Println("All images processed.")
}
```

위 예제에서 5개의 고루틴을 가진 고루틴 풀을 생성하고, 20개의 이미지 처리 작업을 추가합니다. 각 고루틴은 `processImage` 함수를 호출하여 이미지를 처리합니다. 모든 작업이 완료될 때까지 기다린 후 종료합니다.

### 2. sync.Mutex와 sync.RWMutex

고루틴 간에 공유 자원에 대한 접근을 동기화하기 위해 뮤텍스를 사용할 수 있습니다. `sync.Mutex`와 `sync.RWMutex`를 사용하여 임계 구역을 보호합니다.

##### 언제 사용하면 유용한가?
- 공유 자원에 동시 접근을 제어해야 할 때.
- 데이터를 읽고 쓰는 작업이 경쟁 상태(Race Condition)를 발생시킬 수 있을 때.
- 쓰기 작업보다 읽기 작업이 더 빈번하게 일어날 때(`sync.RWMutex`).

##### 실제 사용했을 때의 우위
- **데이터 일관성 보장**: 뮤텍스를 사용하여 동시에 여러 고루틴이 동일한 데이터를 변경하지 않도록 하여 데이터 일관성을 보장할 수 있습니다.
- **데드락 방지**: 올바르게 사용하면 데드락을 방지하고, 프로그램의 안정성을 높일 수 있습니다.
- **성능 향상**: `sync.RWMutex`를 사용하여 읽기 작업을 동시 실행할 수 있어, 읽기 빈도가 높은 애플리케이션의 성능을 향상시킬 수 있습니다.

##### sync.Mutex 사용 예시

```go
package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}

func main() {
    c := SafeCounter{v: make(map[string]int)}
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            c.Inc("somekey")
        }()
    }

    wg.Wait()
    fmt.Println("Final value:", c.Value("somekey"))
}
```

##### sync.RWMutex 사용 예시

`sync.RWMutex`는 읽기와 쓰기를 구분하여 락을 걸 수 있습니다. 읽기 락은 여러 고루틴이 동시에 접근할 수 있지만, 쓰기 락은 오직 하나의 고루틴만 접근할 수 있습니다.

```go
package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu sync.RWMutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.v[key]
}

func main() {
    c := SafeCounter{v: make(map[string]int)}
    var wg sync.WaitGroup

    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go

 func() {
            defer wg.Done()
            c.Inc("somekey")
        }()
    }

    wg.Wait()
    fmt.Println("Final value:", c.Value("somekey"))
}
```

### 3. sync.Cond

`sync.Cond`는 조건 변수를 사용하여 고루틴 간에 이벤트를 신호로 전달할 수 있습니다. 이는 특정 조건이 만족될 때까지 고루틴을 대기시키고, 조건이 만족되면 신호를 보내 고루틴을 깨어나게 합니다.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

type Queue struct {
    items []int
    cond  *sync.Cond
}

func NewQueue() *Queue {
    return &Queue{
        items: []int{},
        cond:  sync.NewCond(&sync.Mutex{}),
    }
}

func (q *Queue) Enqueue(item int) {
    q.cond.L.Lock()
    q.items = append(q.items, item)
    q.cond.Signal()
    q.cond.L.Unlock()
}

func (q *Queue) Dequeue() int {
    q.cond.L.Lock()
    for len(q.items) == 0 {
        q.cond.Wait()
    }
    item := q.items[0]
    q.items = q.items[1:]
    q.cond.L.Unlock()
    return item
}

func main() {
    q := NewQueue()
    var wg sync.WaitGroup

    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := 0; i < 5; i++ {
            fmt.Println("Dequeued:", q.Dequeue())
        }
    }()

    for i := 0; i < 5; i++ {
        time.Sleep(time.Second)
        fmt.Println("Enqueuing:", i)
        q.Enqueue(i)
    }

    wg.Wait()
}
```

### 4. context 패키지

`context` 패키지는 고루틴 간에 취소 신호와 데드라인을 전달하는 데 사용됩니다. 주로 HTTP 요청의 수명 주기를 관리하거나, 타임아웃과 취소 기능을 구현하는 데 사용됩니다.

##### context.Background와 context.WithCancel

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())

    go func() {
        for {
            select {
            case <-ctx.Done():
                fmt.Println("Goroutine canceled")
                return
            default:
                fmt.Println("Goroutine running")
                time.Sleep(500 * time.Millisecond)
            }
        }
    }()

    time.Sleep(2 * time.Second)
    cancel()
    time.Sleep(1 * time.Second)
}
```

##### context.WithTimeout

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
        fmt.Println("Goroutine timeout:", ctx.Err())
    }()

    time.Sleep(3 * time.Second)
}
```

### 5. Worker Pool

고루틴 풀의 확장 버전으로, 작업자 풀(Worker Pool)을 구현하여 작업을 병렬로 처리할 수 있습니다.

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

type WorkerPool struct {
    jobs    chan int
    results chan int
    wg      sync.WaitGroup
}

func NewWorkerPool(numWorkers int) *WorkerPool {
    wp := &WorkerPool{
        jobs:    make(chan int, 100),
        results: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        wp.wg.Add(1)
        go wp.worker(i)
    }
    return wp
}

func (wp *WorkerPool) worker(id int) {
    defer wp.wg.Done()
    for job := range wp.jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(time.Second) // 작업 처리 시뮬레이션
        wp.results <- job * 2
    }
}

func (wp *WorkerPool) AddJob(job int) {
    wp.jobs <- job
}

func (wp *WorkerPool) CloseJobs() {
    close(wp.jobs)
}

func (wp *WorkerPool) Wait() {
    wp.wg.Wait()
    close(wp.results)
}

func main() {
    wp := NewWorkerPool(3) // 3개의 고루틴을 가진 고루틴 풀 생성

    // 10개의 작업 추가
    for i := 1; i <= 10; i++ {
        wp.AddJob(i)
    }

    wp.CloseJobs()
    wp.Wait()

    // 결과 출력
    for result := range wp.results {
        fmt.Println("Result:", result)
    }
}
```

