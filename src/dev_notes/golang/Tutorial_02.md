### 기본 문법과 데이터 타입

#### 변수 선언 및 초기화
Go에서 변수를 선언하고 초기화하는 방법은 여러 가지가 있습니다.

1. 명시적 타입 선언:

```go
var a int
a = 10
```

2. 타입 추론:

```go
var b = 20 // Go가 b의 타입을 int로 추론
```

3. 짧은 선언:

```go
c := 30 // Go가 c의 타입을 int로 추론
```

#### 기본 데이터 타입
Go는 다음과 같은 기본 데이터 타입을 제공합니다:

- **정수형**: int, int8, int16, int32, int64
- **부호 없는 정수형**: uint, uint8, uint16, uint32, uint64, uintptr
- **부동 소수점 숫자형**: float32, float64
- **복소수형**: complex64, complex128
- **문자형**: byte (alias for uint8), rune (alias for int32)
- **문자열**: string
- **불리언**: bool

```go
var (
    anInt       int     = 42
    aFloat      float64 = 3.14
    aString     string  = "Hello, Go!"
    aBool       bool    = true
    aRune       rune    = 'A'
    aByte       byte    = 'a'
)
```

#### 상수
Go에서 상수는 `const` 키워드를 사용하여 선언합니다.

```go
const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

#### 형 변환
Go는 명시적인 형 변환을 요구합니다. 자동으로 형 변환이 이루어지지 않습니다.

```go
var x int = 10
var y float64 = float64(x)
var z int = int(y)
```

#### 제어문
##### 조건문 (if, else, switch)
Go의 조건문은 다음과 같이 사용합니다.

```go
if x > 0 {
    fmt.Println("x는 양수입니다.")
} else if x < 0 {
    fmt.Println("x는 음수입니다.")
} else {
    fmt.Println("x는 0입니다.")
}
```

Switch 문은 여러 조건을 처리할 때 유용합니다.

```go
switch x {
case 1:
    fmt.Println("x는 1입니다.")
case 2:
    fmt.Println("x는 2입니다.")
default:
    fmt.Println("x는 1도 2도 아닙니다.")
}
```

##### 반복문 (for)
Go의 유일한 반복문은 `for`문입니다.

1. 기본 형태:

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

2. 조건만 사용하는 형태:

```go
i := 0
for i < 10 {
    fmt.Println(i)
    i++
}
```

3. 무한 루프:

```go
for {
    fmt.Println("무한 루프")
    break // 무한 루프를 탈출하는 방법
}
```

4. range를 사용하는 형태:

```go
arr := []int{1, 2, 3}
for index, value := range arr {
    fmt.Println(index, value)
}
```

#### break와 continue
- `break`는 반복문을 즉시 종료합니다.
- `continue`는 현재 반복을 건너뛰고 다음 반복으로 진행합니다.

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break // i가 5가 되면 반복문 종료
    }
    if i%2 == 0 {
        continue // i가 짝수면 나머지 코드를 실행하지 않고 다음 반복으로 진행
    }
    fmt.Println(i)
}
```

#### 배열
배열은 고정된 크기를 가지며 동일한 타입의 요소들로 구성됩니다.

```go
var arr [5]int // 크기가 5인 정수형 배열 선언
arr[0] = 1     // 첫 번째 요소에 값 할당
fmt.Println(arr)
```

배열의 초기값 설정:

```go
arr := [5]int{1, 2, 3, 4, 5}
fmt.Println(arr)
```

배열의 길이 확인:

```go
fmt.Println(len(arr))
```

다차원 배열:

```go
var twoD [3][4]int // 3x4 크기의 이차원 배열
for i := 0; i < 3; i++ {
    for j := 0; j < 4; j++ {
        twoD[i][j] = i + j
    }
}
fmt.Println(twoD)
```

#### 슬라이스
슬라이스는 배열과 유사하지만, 크기가 가변적입니다.

```go
slice := []int{1, 2, 3, 4, 5} // 초기화와 동시에 값 할당
fmt.Println(slice)
slice = append(slice, 6) // 슬라이스에 새로운 요소 추가
fmt.Println(slice)
```

슬라이스의 부분 배열 참조:

```go
subSlice := slice[1:3] // 두 번째 요소부터 세 번째 요소까지 참조
fmt.Println(subSlice)
```

슬라이스의 길이와 용량 확인:

```go
fmt.Println(len(slice)) // 길이
fmt.Println(cap(slice)) // 용량
```

슬라이스의 생성:

```go
makeSlice := make([]int, 5)    // 길이 5, 용량 5인 슬라이스 생성
makeSliceWithCap := make([]int, 5, 10) // 길이 5, 용량 10인 슬라이스 생성
fmt.Println(makeSlice)
fmt.Println(makeSliceWithCap)
```

`make` 함수는 동적으로 배열, 슬라이스, 맵을 생성하는 데 사용됩니다. 위의 예제에서 `make` 함수는 슬라이스를 생성하는데, 첫 번째 매개변수는 타입, 두 번째 매개변수는 슬라이스의 길이, 세 번째 매개변수는 슬라이스의 용량입니다.

길이(length)와 용량(capacity)은 Go 언어에서 슬라이스(slice)를 이해할 때 중요한 개념입니다. 두 가지는 서로 다른 의미와 용도로 사용됩니다.

### 길이 (Length)
길이(length)는 슬라이스에 현재 저장된 요소의 개수를 나타냅니다. 이는 슬라이스가 실제로 사용하고 있는 요소의 수를 의미합니다. 예를 들어, 슬라이스에 5개의 요소가 있다면 길이는 5입니다.

### 용량 (Capacity)
용량(capacity)은 슬라이스가 내부적으로 사용할 수 있는 전체 공간을 나타냅니다. 이는 슬라이스의 기본 배열이 확장 없이 저장할 수 있는 최대 요소의 수를 의미합니다. 예를 들어, 슬라이스의 용량이 10이라면, 슬라이스는 추가적인 메모리 할당 없이 최대 10개의 요소를 저장할 수 있습니다.

### 예제 코드

```go
package main

import "fmt"

func main() {
    // 길이 5, 용량 10인 슬라이스 생성
    makeSliceWithCap := make([]int, 5, 10)

    // 슬라이스 초기 상태 출력
    fmt.Println("슬라이스 초기 상태:", makeSliceWithCap)
    fmt.Println("길이:", len(makeSliceWithCap)) // 길이: 5
    fmt.Println("용량:", cap(makeSliceWithCap)) // 용량: 10

    // 요소 추가
    makeSliceWithCap = append(makeSliceWithCap, 1, 2, 3, 4, 5)
    fmt.Println("요소 추가 후 슬라이스 상태:", makeSliceWithCap)
    fmt.Println("길이:", len(makeSliceWithCap)) // 길이: 10
    fmt.Println("용량:", cap(makeSliceWithCap)) // 용량: 10

    // 용량 초과 요소 추가
    makeSliceWithCap = append(makeSliceWithCap, 6)
    fmt.Println("용량 초과 요소 추가 후 슬라이스 상태:", makeSliceWithCap)
    fmt.Println("길이:", len(makeSliceWithCap)) // 길이: 11
    fmt.Println("용량:", cap(makeSliceWithCap)) // 용량이 확장된 값 출력
}
```

### 설명
1. **초기 상태**:
    - `makeSliceWithCap := make([]int, 5, 10)`을 통해 길이 5, 용량 10인 슬라이스를 생성합니다.
    - `len(makeSliceWithCap)`는 5를 반환합니다.
    - `cap(makeSliceWithCap)`는 10을 반환합니다.

2. **요소 추가**:
    - `makeSliceWithCap = append(makeSliceWithCap, 1, 2, 3, 4, 5)`를 통해 5개의 요소를 추가합니다.
    - 이 시점에서 길이는 10이 되고, 용량은 여전히 10입니다.

3. **용량 초과 요소 추가**:
    - `makeSliceWithCap = append(makeSliceWithCap, 6)`을 통해 요소 하나를 추가하면, 슬라이스의 용량이 초과되므로 내부 배열이 확장됩니다.
    - 길이는 11이 되고, 용량은 Go 런타임에 의해 확장된 새로운 값이 됩니다 (보통 기존 용량의 두 배로 증가).

#### 길이와 용량의 차이점
- **길이**는 현재 슬라이스에 저장된 요소의 수입니다.
- **용량**은 슬라이스가 추가적인 메모리 할당 없이 저장할 수 있는 최대 요소의 수입니다.
- 슬라이스의 길이는 `len` 함수를 사용하여 확인할 수 있으며, 용량은 `cap` 함수를 사용하여 확인할 수 있습니다.


#### 맵
맵은 키-값 쌍을 저장하는 데이터 구조입니다.

```go
var m map[string]int
m = make(map[string]int)
m["one"] = 1
m["two"] = 2
fmt.Println(m)
```

맵의 값을 조회할 때, 키가 존재하지 않을 경우에 대한 처리를 할 수 있습니다.

```go
value, exists := m["one"]
if exists {
    fmt.Println("Value:", value)
} else {
    fmt.Println("Key does not exist.")
}
```

맵의 반복:

```go
for key, value := range m {
    fmt.Println(key, value)
}
```

맵에서 키 삭제:

```go
delete(m, "one")
fmt.Println(m)
```

맵의 초기화:

```go
initializedMap := map[string]int{"foo": 1, "bar": 2}
fmt.Println(initializedMap)
```

