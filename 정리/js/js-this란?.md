# javascript의 this란?

## this란?

`this`는 함수나 메서드 내에서 자주 사용되며, 객체지향 프로그래밍에서 특히 중요한 역할을 합니다.

Javascript에서 `this`는 현재 실행 context에서 참조하는 객체를 의미합니다. 예를 들어 현재 실행되고 있는 함수가 있다고 생각해 봅시다.
실행되고 있는 함수에서 `this`를 호출하면, 해당 함수 또는 메서드 호출한 객체가 `this`가 됩니다.

`this`는 실행 되고 있는 컨텍스트를 참조하기 때문에 여러 종류가 있다고 생각 해볼 수 있습니다. 다음은 실행 컨텍스트의 종류에 따른 `this`의 분류 입니다.

- 전역 컨텍스트: 전역 객체(브라우저에서는 'window', NodeJs에서는 'global')를 의미합니다.
  <br/>

  ```javascript
  console.log(this) // 브라우저에서는 window
  ```

- 함수 컨텍스트: 함수를 호출한 객체를 가리킵니다. 함수를 단독으로 실행한
  경우에는 전역 객체를 가리킵니다.
  <br>

  ```javascript
  function foo() {
    console.log(this)
  }
  foo() // 전역 객체인 window 또는 global이 출력됩니다.

  const obj = {
    bar: function () {
      console.log(this)
    },
  }
  obj.bar() // obj 객체가 출력됩니다.
  ```

  `foo()` 함수는 단독으로 실행되었으므로, `this`는 전역 객체를 가리킵니다. 하지만 `obj` 객체의 `bar()` 메소드는 `obj` 객체에서 호출 되었으므로, 함수 컨텍스트에서 `this`를 호출하면 `obj`객체를 가리킵니다.
  <br>

- 메서드 컨텍스트: 메서드를 호출한 객체를 가리킵니다.
  <br>

  ```javascript
  const obj = {
    name: 'Jin',
    sayMessage: function () {
      console.log(`Message, ${this.name}!`)
    },
  }
  obj.sayMessage() // 'Message, Jin!' 출력됩니다.
  ```

  `obj` 객체의 `sayMessage()` 메서드는 `obj` 객체 내부에서 호출되었으므로 메서드 컨텍스트에서 `this`를 호출하면 `obj` 객체를 가리킵니다. 즉 `this.name`은 `obj`객체의 `name` 프로퍼티인 `jin`을 출력합니다.
  <br>

- 이벤트 핸들러: 이벤트를 발생시킨 객체를 가리킵니다.

  ```html
  <button id="myButton">Click</button>
  ```

  <br>

  ```javascript
  const button = document.querySelector('#myButton')

  button.addEventListener('click', function () {
    console.log(thiss) // 클릭한 #myButton 요소를 출력됩니다.
  })
  ```

  `addEventListener()` 메서드에 전달한 함수는 이벤트 핸들러 입니다.
  `button` 요소를 클릭하면 이벤트 핸들러가 실행되며, 이벤트 핸들러 내에서 `this`를 호출하면 클릭한 `button` 요소를 가리킵니다.

## call, apply, bind

함수 내부에서 `this`의 값을 지정할때 3가지 방법에 대해 정확히 알고 있어야 합니다.

- call: 은 함수를 호출할 때 첫 번째 매개변수로 전달된 객체를 `this`로 지정하고, 이후 매개변수를 순서대로 인수로 전달합니다.
  <br>

  ```javascript
  function greet() {
    console.log(`Hello, ${this.name}`)
  }
  const person = {name: 'jin'}
  greet.call(person) // "Hello, jin"이 출력 됩니다.
  ```

  위 예제에서 `greet.call(persion)`은 `greet()` 함수를 호출할 때
  `person` 객체를 `this`로 지정합니다. 따라서 `this.name`은
  `persion` 객체의 `name` 프로퍼티인 `jin`을 출력하게 됩니다.
  <br>

- apply: `call()`과 동일하게 함수를 호출할때 첫 번째 매개변수로 전달된 객체를 `this`로 지정하고, 그 이후의 매개변수를 배열로 묶어서 인수로 전달합니다.

  ```javascript
  function greet() {
    console.log(`Hello, ${this.name}`)
  }

  const person = {name: 'jin'}
  greet.apply(persion) // "Hello jin"이 출력 됩니다.
  ```

  두 차이는 `apply()`는 두 번째 인자를 배열로 받는다는 것입닏다.
  두 차이에 대한 예시는 아래와 같습니다.

  ```javascript
  function greet(message, punctuation) {
    console.log(`${message}, ${this.name}${punctuation}`)
  }

  const person = {name: 'jin'}

  greet.call(person, 'Hello', '!') // 'Hello, jin!'가 출력됩니다.

  greet.apply(person, ['Hi', '!']) // 'Hi, jin!'가 출력됩니다.
  ```

- bind: 함수 내부에서 `this`의 값을 영구히 바꿀 수 있습니다.
  `bind()`는 함수를 호출하는 것이 아니라, 함수를 복제한 새로운 함수를 반환합니다. 이 새로운 함수는 `this`의 값을 인자로 전잘된 객체로 고정한 상태에서 호출할 수 있습니다.
  <br>

  ```javascript
  function greet() {
    console.log(`Hello, ${this.name}`)
  }

  const person = {name: 'jin'}
  const greetPerson = greet.bind(person)
  greeetPerson() //'Hello jin'이 출력됩니다.
  ```

  <br>
  `bind()` 메소드는 `greet()` 함수를 호출할 때 `person`객체를
  `this`로 지정한 새로운 함수 `greetperson`을 생성합니다. 이후에
  `greetPeerson()`을 호출하면 `this`는 `person`객체를 가리키므로,
  'Hello, jin'을 출력하게 됩니다.
