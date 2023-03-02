# Promise란?

## Promise

Promise는 Javascript에서 비동기 처리를 위해 사용된는 객체입니다.

Promise는 3개의 상태를 가집니다. 이를 통해 비동기 처리의 진행 상태를 알 수 있습니다.

1. 대기(pending): 비동기 처리가 진행 중인 상태입니다.
   이 상태에서 `Promise` 객체는 이행 또는 거부 상태로 변경 될 수 있습니다.
   <br>
2. 이행(fulfilled): 비동기 처리가 성공적으로 완료된 상태입니다. 이 시점에는 처리 결과를 값으로 가지고 있습니다. Promise 객체의 then() 메소드가 호출되면, 이행 상태에서 처리 결과를 매개변수로 전달받습니다.
   <br>
3. 거부(rejceted): 비동기 처리가 실패한 상태입니다.
   실패시 오류 객체(Error)로 가지고 있습니다. Promise 객체의 catch() 메소드가 호출되면, 거부 상태에서 오류 객체를 매개변수로 전달받습니다.

이 3가지 상태를 처리하기 위해서 Prmoise 객체는 `then()`과 `catch()` 메소드를 제공하여
상태를 처리 합니다. `then()` 메소드는 `이행(fulfilled)` 상태일 때 호출되며
처리 결과를 매개변수로 전달합니다. `catch()` 메소드는 `거부(rejected)` 상태일 때 호출되며
Error 객체를 매개변수로 전달합니다.

다음은 `Promise` 객체를 사용하여 비동기 처리를 하는 예시입니다.

```javascript
function fetchData(){
  return new Promise(function(resolve, reject){
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://exmaple.com/data');
    xhr.onload = function(){
      if (xhr.status === 200){
        resolve(xhr.response)
      } else{
        reject(new Error(xhr.statusText);)
      }
    }
    xhr.onerror = function(){
      reject(new Error('Network error'))
    };
    xhr.send();
  })
}
fetchData().then(function(data){
  console.log('Data loaded',data);
}).catch(function(error){
  console.error('Error occurred',error)
})
```

위 코드에서 fetchData() 함수는 `Promise` 객체를 반환하며, 비동기 처리가 완료되면
`resolve()` 함수를 호출하여 처리된 결과를 전달합니다. 다음으로 `then()` 메소드를 사용하여
처리 결과에 대한 처리를 합니다. 만약 오류가 발생하면 `reject()` 함수를 호출하여
`거부(rejected)` 상태로 변경합니다. 이후 `catch()` 메소드를 사용하여 오류를 처리합니다.

## Promise.all()

Promise.all(iterable) 전달된 모든 Promise 객체들이 모두
이행상태가 되면 처리 결과를 배열로 반환합니다. 만약 중간에 하나라도 거부상태가 되면 전체 처리결과는 거부상태가 되며 가장 먼저 거부상태가 된
객체의 오류를 반환합니다.

다음은 사용 예시 입니다.

```javascript
Promise.all([
  fetchData('https://example.com/data1'),
  fetchData('https://example.com/data2'),
  fetchData('https://example.com/data3'),
])
  .then(function (results) {
    console.log('Data loaded', results)
  })
  .catch(function (error) {
    console.error('Error occurred', error)
  })
```

위 코드에서 모든 Promise 객체가 이행 상태가 된다면 처리 결가ㅗ를 배열로
전달 받습니다. 이 처럼 각각의 promise 객체를 병렬로 사용할 수 있기 떄문에
여러 개의 비동기 처리를 병렬로 실행 해야 한다면 사용을 고려 할 수 있습니다.

하지만 처리에 시간이 오래 걸리는 경우가 하나라도 존재 한다면 발생하면 전체적으로 시간이 늦어 질 수 있습니다.
