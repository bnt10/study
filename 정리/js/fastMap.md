# FastMap

Array.prototype.map은 배열 크기를 동적 할당으로 알고 있어 정적 할당 map을 생성하여 두 차이를 비교해보려고 합니다.

## fastMap 구현
```typescript
export function fastMap<T = any, R = any>(
  subject: T[],
  iterator: (t: T, i: number, s: T[]) => R
): R[] {
  const { length } = subject
  const result: R[] = new Array(length)

  for (let i = 0; i < length; i += 1) {
    result[i] = iterator(subject[i] as T, i, subject)
  }
  return result
}
```

제공된 fastMap 함수와 JavaScript의 내장 Array.prototype.map 함수는 비슷한 기능을 수행하지만, 
구현과 성능 최적화 측면에서 몇 가지 차이점이 있습니다. 두 함수 모두 배열의 각 요소에 대해 함수를 실행하고 결과를 새 배열로 반환하는 데 사용됩니다. 하지만 구체적인 차이점들을 살펴보면 다음과 같습니다:

1. 성능 최적화:
fastMap: 사전에 결과 배열의 크기를 정확히 할당하여 초기화합니다(new Array(length)). 이 방법은 배열이 미리 정의된 크기를 가지고 시작하므로, 배열 크기 변경으로 인한 메모리 재할당을 피하고 성능을 향상시킬 수 있습니다. 또한, for 루프를 사용하여 요소를 반복합니다. 이러한 최적화는 특히 큰 배열에서 성능 이점을 제공할 수 있습니다.
Array.prototype.map: 내장 map 함수는 성능 최적화가 다양한 JavaScript 엔진에 의해 내부적으로 처리됩니다. 이는 엔진마다 다를 수 있지만, 일반적으로 잘 최적화되어 있습니다. 그러나 map 함수는 결과 배열의 크기를 미리 할당하지 않고 동적으로 배열을 구성합니다.
2. 추상화 및 안전성:
fastMap: 사용자 정의 함수이므로, 특정 사용 사례에 맞게 최적화하거나 수정할 수 있습니다. 하지만 내장 함수에 비해 오류 처리나 예외 상황을 직접 관리해야 할 필요가 있습니다. 또한, fastMap을 사용할 때는 해당 함수가 프로젝트에 포함되어 있고 적절히 테스트되었는지 확인해야 합니다.
Array.prototype.map: 내장 함수는 언어 사양에 따라 설계되어 있으며, 다양한 엣지 케이스와 오류 상황을 처리합니다. 이는 일반적으로 더 안정적이며 예측 가능한 동작을 보장합니다. 또한, 모든 표준 JavaScript 환경에서 사용할 수 있습니다.
3. 호환성 및 사용성:
fastMap: 특정 프로젝트나 라이브러리에서 정의된 사용자 정의 함수이므로, 이 함수를 사용하려면 해당 함수의 구현을 프로젝트에 포함시키거나 참조해야 합니다.
Array.prototype.map: JavaScript의 모든 환경에서 사용할 수 있는 내장 함수입니다. 새로운 환경이나 다른 개발자와의 코드 공유에 있어서 추가적인 설명이나 구현을 포함할 필요가 없습니다.



## Test

### 테스트 코드
```typescript
  const testArray = Array.from({ length: 1_000_000 }, (_, i) => ({
    key: i + 1,
  }))

  console.time('Array.map: ')
  testArray.map((item) => {
    return { ...item, key: item.key + 1 }
  })
  console.timeEnd('Array.map: ')

  console.time('fastMap: ')
  fastMap(testArray, (item) => {
    return { ...item, key: item.key + 1 }
  })
  console.timeEnd('fastMap: ')
```
### 결과
```typescript
Array.map: : 57.19384765625 ms
fastMap: : 21.511962890625 ms
```

속도상 이점은 확인 했으나 정적 할당으로 인한 메모리 이점을 확인하는 방법은 추후 테스트 예정
