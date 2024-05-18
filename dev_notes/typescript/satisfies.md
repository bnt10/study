# Satisfies

## Satisfies?
Satisfies는 Typescript 4.9부터 도입된 새로운 기능입니다. 이 연산자는 주로 타입 호환성을 검사할 때 사용됩니다.
특정 객체가 특정 타입을 '만족(satisfiy)`하는지를 검사하는 것이며 이를 통해 타입 안정성을 강화 할 수 있습니다.

## 사용방법
기본적인 사용 방법은 다음과 같습니다:
```typescript
let someObject = { ... };
someObject satisfies SomeType;
```
여기서 someObject는 검사하고자 하는 객체이고, SomeType은 해당 객체가 만족해야 하는 타입입니다.

someObject satisfies SomeType 구문은 someObject가 SomeType 타입과 호환되는지를 검사합니다. 이는 주로 다음과 같은 상황에서 유용합니다

## 사용 이점

**타입 가드:** 특정 객체가 예상한 타입을 충족하는지 검사할 때 유용합니다. 이를 통해 런타임 오류를 예방하고, 코드의 안정성을 높일 수 있습니다.

**코드 리팩토링 시:** 코드를 리팩토링하거나 변경할 때, satisfies 연산자를 사용하면 변경된 코드가 기존의 타입 계약을 여전히 만족하는지 확인할 수 있습니다. 

**오류 메시지 개선:** 기존의 타입 호환성 검사에 비해 더 명확하고 이해하기 쉬운 오류 메시지를 제공합니다. 이는 개발자가 타입 오류를 더 쉽게 진단하고 수정할 수 있게 도와줍니다.
예를 들어, 다음과 같은 상황에서 satisfies 연산자를 사용할 수 있습니다:

```typescript
interface Person {
  name: string;
  age: number;
}
const john = { name: "John", age: "30", occupation: "Developer" };
john satisfies Person; // 이 구문은 john 객체가 Person 인터페이스를 충족하는지 검사합니다.
```
위 예제에서, john 객체는 Person 인터페이스를 만족하는지 검사하고 있습니다. 만약 john 객체가 Person 인터페이스의 요구사항을 충족하지 못한다면, TypeScript 컴파일러는 아래와 같이 오류를 표시할 것입니다.
```
Type '{ name: string; age: string; department: string; }' does not satisfy the constraint 'Person'.
  Types of property 'age' are incompatible.
    Type 'string' is not assignable to type 'number'.
```

