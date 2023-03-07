# Prototype

## Prototype이란?

Javascript에서 객체는 프로토타입(Prototype) 기반으로 동작합니다. 객체의 프로토타입은
해당 객체를 생성한 생성자 함수의 prototype 프로퍼티에 저장된 객체 입니다. 즉 객체는 자기 자신의 프로토 타입 객체를 상속하며
프로토 타입 체인(Prototype Chain)을 통해 상위 객체의 프로퍼티를 사용할 수 있습니다.

예를 들어 다음과 같이 Person 생성자 함수를 정의하고, john과 mary 객체를 생성한다고 가정해 봅시다.

```javascript
function Persion(name, age) {
  this.name = name
  this.age = age
}

const john = new Person('John', 30)
const mary = new Person('Mary', 25)
```

위 코드에서 Person 함수의 prototype 프로퍼티에는 빈 객체가 할당됩니다. 이는 Person 함수를 생성자로 사용하여
객체를 생성할 때 생성된 객체의 프로토타입이 이 빈 객체를 상속받게 됩니다.

그렇기 떄문에 john과 mary 객체는 Person 함수의 prototype 프로퍼티에 저장된 객체를 상속받습니다. 이를 통해
john과 mary 객체는 Person 함수의 프로토타입 객체에 정의된 메소드나 프로퍼티를 사용할 수 있습니다.

결과적으로 John과 mary 객체는 Person 함수의 prototype 프로퍼티에 저장된 객체를 상속받습니다.
이를 통해 john과 mary 객체는 Person 함수의 프로토타입 객체에 정의된 메소드나 프로퍼티를 사용할 수 있습니다.

```javascript
Person.prototype.greet = function () {
  console.log(`Hello, my name ise ${this.name} and I'm ${this.age} years old.`)
}
john.greet() // "Hello, my name is John and I'm 30 years old."
mary.greet() // "Hello, my name is Mary and I'm 25 years old."
```

위 코드에서 Person 생성자 함수의 prototype 프로퍼티에 greet 메소드를 추가하여 john과 mary
객체에 해당 메소드를 호출하고 있습니다. 이를통해 john과 mary 객체는 Person 함수의 프로토타입 객체에서 정의된
greet 메소드를 상속받아 사용하고 있습니다.

프로토타입은 객체의 상속을 구현하는데 중요한 역활을 합니다. 객체의 프로토타입 체인을 통해 다른 객체의 메소드나
프로퍼티를 재사용할 수 있으므로 코드의 재사용성을 높일 수 있습니다.
