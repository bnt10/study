# Parameters

TypeScript에서 `Parameters`는 내장 유틸리티 타입으로, 함수 타입의 모든 매개변수 타입을 튜플 형태로 추출해 줍니다. 이는 주로 함수의 매개변수 타입을 재사용하고 싶을 때 유용하게 사용됩니다.

예를 들어, `Parameters<typeof 함수명>` 형태로 사용하면 해당 함수의 모든 매개변수 타입을 튜플로 가져올 수 있습니다. 이를 통해 다른 함수나 유틸리티 타입에서 해당 함수의 매개변수 타입을 재사용할 수 있습니다.

### 예시

예를 들어, `fetch` 함수의 매개변수 타입을 추출하는 예시는 다음과 같습니다:

```typescript
type FetchParameters = Parameters<typeof fetch>;
```

이 코드는 `fetch` 함수의 매개변수 타입을 `FetchParameters`라는 새로운 타입으로 정의합니다. 
`fetch` 함수는 보통 두 개의 매개변수를 받습니다: 첫 번째는 요청을 보낼 리소스의 URL이고, 
두 번째는 요청에 대한 옵션을 포함하는 객체입니다. 따라서 `FetchParameters` 타입은 이 두 매개변수의 타입을 튜플 형태로 포함하게 됩니다.

```typescript
# 추출형태
type FetchParameters = [input: string | URL | Request, init?: RequestInit | undefined] 
```

`Parameters` 유틸리티 타입은 함수의 매개변수 타입을 다른 곳에서 재사용하고 싶을 때 매우 유용하며, TypeScript의 타입 시스템을 보다 효율적으로 사용할 수 있게 해줍니다.
