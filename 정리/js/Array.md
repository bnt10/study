# Array

Javascipt에서 사용되는 배열 생성 방법들은 다음과 같습니다.

1. Literal Syntax : 초기값이 명확하고 몇 개 되지 않을 때 주로 사용합니댜.

  ```javascript
  const arr = [1,2,3]
  ```

2. Array Constructor : **배열의 크기만** 미리 정하고 나중에 값을 채울 경우 사용합니다.
   
```javascript
const arr = new Array(1,2,3)
```
3. Array.from() : 유사 배열 객체나 반복 가능한 객체를 배열로 변환할 필요가 있거나
   배열을 생성하는 동안 복잡한 로직을 적용할때 사용합니다.
   
  ```javascript
const arr = Array.from({length:5} , (_, i) =>i)
   ```
4. Array.of() : 일반적으로 개수나 데이터 타입이 다른 여러개 요소를 배열로 만들고 싶을 때 사용합니다.
    
  ```javascript
  const arr = Array.of(1,'text',true)
  ```
5. Spread Operator : 주로 기존 배열을 복사하거나 다른 배열과 합칠때 주로 사용 합니다.
   
  ```javascript
  const arr = [...otherArray]
  ```
6. Array.prototype.fill() : 특정 값으로 배열을 초기화 시키고 싶은 경우 사용합니다.

```javascript
const arr = new Array(5).fill(0)
```
7. map, filter, reduce :
  - map : 배열의 각 요소에 동일한 함수를 적용하여 결과로 새 배열을 만들때 사용합니다. React에서는 렌더링 할때 주로 사용됩니다.
  - filter : 배열의 요소 중 특정 조건을 만족하는 요소로만 배열을 새로 만들고 싶을 때 사용합니다.
  - reduce : 배열의 모든 요소를 순회하며 **누적 계산값** 을 생성할 때 사용합니다. 배열을 단일 값으로 축약 할떄도 유용 합니다.
   
```javasciprt
// map
const numbers = [1, 2, 3];
const squared = numbers.map(x => x * x);  // [1, 4, 9]\

//filter
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(x => x % 2 === 0);  // [2, 4]

//reduce
const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, x) => acc + x, 0);  // 6

``` 
