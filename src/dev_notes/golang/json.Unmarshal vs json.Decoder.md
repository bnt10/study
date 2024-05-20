# json.Unmarshal vs json.Decoder

## Go 언어에서 JSON 데이터를 Go의 데이터 구조로 변환하는 방법

Go 언어에서 JSON 데이터를 Go의 데이터 구조로 변환하는 작업에는 주로 두 가지 방법이 사용됩니다: `json.Unmarshal`과 `json.Decoder`. 이 두 방법은 비슷한 작업을 수행하지만, 사용하는 콘텍스트와 몇 가지 기능적 차이가 있습니다.

### 1. json.Unmarshal

`json.Unmarshal` 함수는 byte 슬라이스에 저장된 JSON 데이터를 Go의 데이터 구조로 변환합니다. 이 방법은 메모리에 JSON 데이터가 전체적으로 저장되어 있을 때 사용됩니다.

```go
var data MyData
err := json.Unmarshal(byteValue, &data)
if err != nil {
    log.Println(err)
}
```

**장점:**

- 메모리에 이미 로드된 JSON 데이터를 처리할 때 빠르고 쉽게 사용할 수 있습니다.
- 작은 크기의 JSON 데이터 처리에 적합합니다.

**단점:**

- 전체 데이터를 메모리에 로드해야 하므로 매우 큰 JSON 파일을 처리할 때는 메모리 사용이 비효율적일 수 있습니다.

### 2. json.Decoder

`json.Decoder`는 스트림(예: 파일, 네트워크 연결 등)에서 직접 JSON 데이터를 읽어서 Go의 데이터 구조로 변환합니다. 이 방법은 데이터를 스트림에서 직접 처리할 때 사용됩니다.

```go
var data MyData
err := json.NewDecoder(r.Body).Decode(&data)
if err != nil {
    log.Println(err)
}
```

**장점:**

- JSON 데이터를 스트림으로부터 직접 읽기 때문에, 큰 크기의 JSON 데이터를 메모리 효율적으로 처리할 수 있습니다.
- 데이터를 조금씩 읽으면서 처리할 수 있어서 대용량 처리에 적합합니다.

**단점:**

- 처리 과정에서 스트리밍을 관리해야 하므로 코드가 약간 더 복잡할 수 있습니다.
- 데이터의 일부만 필요한 경우에도 스트림 전체를 읽어야 할 수 있습니다.

### 사용 케이스 비교

- **json.Unmarshal**: JSON 데이터가 이미 메모리에 전체적으로 로드되어 있고, 데이터의 크기가 그리 크지 않을 때 적합합니다.
- **json.Decoder**: HTTP 요청과 같이 스트림 형태로 제공되는 JSON 데이터를 처리해야 할 때 사용하며, 크기가 큰 데이터를 메모리 효율적으로 다룰 수 있습니다.

### 결론

두 방법은 상황에 따라 선택해서 사용하면 되며, JSON 데이터의 소스와 크기, 처리 방식에 따라 적절한 도구를 선택하는 것이 중요합니다.

---
