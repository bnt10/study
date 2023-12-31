# typeof vs keyof
TypeScript에서 `keyof`와 `typeof`는 서로 다른 유형의 메타데이터를 추출하는 데 사용되는 연산자입니다. 각각의 용도와 사용법에 대해 설명하겠습니다.

### `keyof` 연산자
`keyof`는 객체 타입의 키를 문자열 또는 숫자 리터럴의 유니언으로 추출합니다. 이는 객체의 각 프로퍼티 이름을 타입으로 사용할 수 있게 해줍니다. 주로 객체 타입의 키에 대한 타입 안전성을 보장하고자 할 때 사용됩니다.

#### 사용 예:
```typescript
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // 'name' | 'age'
```

여기서 `PersonKeys` 타입은 `'name' | 'age'`의 유니언 타입입니다. 즉, `Person` 객체의 키만을 타입으로 사용할 수 있게 됩니다.

### `typeof` 연산자
`typeof`는 변수 또는 객체의 타입을 추출합니다. JavaScript의 `typeof` 연산자와 유사하지만, TypeScript에서는 타입 정보를 기반으로 한 더 정밀한 타입 추출이 가능합니다. 주로 변수에서 선언된 타입을 다른 곳에서 재사용하고 싶을 때 사용됩니다.

#### 사용 예:
```typescript
let person = {
  name: "John",
  age: 30
};

type PersonType = typeof person; // { name: string; age: number; }
```

여기서 `PersonType`은 `person` 객체의 구조를 나타내는 타입, 즉 `{ name: string; age: number; }` 타입을 가지게 됩니다.

### 차이점 요약:
- **`keyof`**: 객체 타입의 모든 키를 유니언 타입으로 반환합니다. 객체의 키를 타입으로 사용할 때 주로 사용됩니다.
- **`typeof`**: 변수 또는 객체의 타입을 반환합니다. 기존 변수의 타입을 재사용하고 싶을 때 주로 사용됩니다.

두 연산자는 각각의 사용 사례에 따라 코드의 타입 안전성과 재사용성을 높이는 데 크게 기여할 수 있습니다.
