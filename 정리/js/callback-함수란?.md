# Callback 함수란?

## Callback 함수

`콜백 함수(Callback function)`는 다른 함수에 매개변수로 전달되는 함수를 의미합니다. 콜백함수는 전달받은 함수 내에서 필요한 시점에 호출 할 수 있습니다.

주로 콜백 함수는 비동기적인 처리를 할 때나, 다른 함수가 실행을 마치고 나면 그 결과를 다시 이용하여 후 처리를 하고 싶을 때 유용하게 사용할 수 있습니다.
아래 예시는 콜백 함수 사용에 대한 예시 입니다.

```javascript
function calculate(a, b, callback) {
  const result = a + b
  callback(result)
}

calculate(10, 20, function (result) {
  console.log(result) // 30이 출력됩니다.
})
```

위 예제에서 `calcuate()` 함수는 두 개의 숫자를 입력받아 더한 후, 그 결과를 `callback` 함수에 전달합니다. `calculate()`함수를 호출할 때, 마지막 인자로 콜백 함수를 전달하고 있습니다. 이 콜백함수는 `calcuate()`함수에서 결과를 받아서 처리하는 역할을 합니다.`calculate()` 함수의 실행 결과로 전달된 숫자 값인 `30`이 `callback()` 함수로 전달되어 출력됩니다.

이 처럼 콜백 함수는 매우 유용하게 사용이 가능합니다. 하지만 콜백 함수를 많이 사용한다면 콜백 지옥이 발생합니다. 다음은 콜백 함수를 남발했을 경우 발생한 콜백 지옥에 대해서 알아보겠습니다.

## 콜백 지옥(callback hell)

콜백 함수를 연속적으로 중첩하여 사용할 때 발생하는 코드의 가독성이나 유지보수성이 저하되는 상황을 의미합니다.

콜백 함수를 사용하면 비동기적인 작업을 처리할 수 있지만, 콜백 함수를 중첩하여 사용하면 코드가 매우 복잡해지고 가독성이 떨어지게 됩니다. 특히 비동기적 처리가 반복적으로 이루어지는 경우를 주의 해야 합니다.

예를 들어 다음과 같은 비동기 처리 콛드가 있다고 가정해 봅시다.

```javascript
loadData('https://api.example.com/data1', function (data1) {
  processData(data1, function (result1) {
    loadData('https://api.example.com/data2', function (data2) {
      processData(data2, function (result2) {
        loadData('https://api.example.com/data3', function (data3) {
          processData(data3, function (result3) {
            // ... 이하 생략
          })
        })
      })
    })
  })
})
```

위 코드에서는 `loadData()` 함수로 비동기 데이터를 로드한 후,`processData()` 함수로 처리하고 있습니다. 이 코드는 데이터를 연속해서 콜백함수로 계속 전달하고 있어 콜백지옥이에 떨어지게 됩니다. 이러한 콜백 지옥을 어떻게 해결 할 수 있을까요? 다음은 콜백 지옥을 해결하기 위한 `async/await` 에 대해서 살펴 봅시다.

## async/await

`Promise`를 기반으로 한 비동기 처리 방법으로, 콜백과 비교해 코드의 가독성과 유지보수성을 높일 수 있습니다.

콜백 함수는 비동기 처리 결과를 다른 함수의 매개변수로 전달하여 처리하는 방법입니다. 반면에 `async/await`는 Promise를 반환하는 비동기 함수에서 `await` 키워드를 사용하여 Promise가 처리될 떄까지 기다린 후 결과를 변수에 할당합니다. 이 때 `await` 키워드가 사용된 비동기 함수는 동기적으로 처리됩니다. 이를 통해 비동기 처리 코드를 동기적으로 처리하는 것처럼 작성할 수 있으며, 코드의 가독성과 유지보수성을 높일 수 있습니다.

그렇다면 어떻게 `async/await` 로 방금 콜백지옥에 떨어진 코드 예시를 변경하는지 예시를 통해 살펴 봅시다.

```javascript
async function loadAndProcessData() {
  try {
    const data1 = await loadData('https://api.example.com/data1')
    const result1 = await processData(data1)
    const data2 = await loadData('https://api.example.com/data2')
    const result2 = await processData(data2)
    const data3 = await loadData('https://api.example.com/data3')
    const result3 = await processData(data3)
    // ... 이하 생략
  } catch (error) {
    console.error(error)
  }
}
```

하나의 데이터 흐름에서 파생되어 연달아 콜백처리 되던 함수가 각작의 마치 동기 코드처럼 변경된 것을 확인 할 수 있습니다.

그렇다면 모든 코드를 `async/awiat`로 수정해야 하는걸까요? 다음과 같은 경우는 `콜백 함수`를 사용하는 것이 더 적합한 상황에 대한 예시 입니다.

- Promise를 반환하는 함수를 사용하지 않는 경우
  async/await는 promise 기반이기 때문에 promise를 사용하지 않는다면 사용 할 수 없습니다.

- 처리 시간이 짧은경우
  async/await는 처리를 기달리기 때문에 처리 과정이 짧고
  연달아 콜백함수를 하지 않는다면 성능상 차이가 발생 합니다.

따라서, async/await는 코드의 가독성과 유지보수성을 높이는 데 유용한 방법이지만, 모든 상황에서 사용할 수 있는 것은 아니며, 상황에 따라 적절한 비동기 처리 방법을 선택해야 합니다.
