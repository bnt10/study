TypeScript에서 `type`과 `interface`는 모두 사용자 정의 타입을 생성할 때 사용되며, 비슷한 기능을 수행하지만 몇 가지 중요한 차이점이 있습니다.

### `type`
`type` 키워드는 타입 별칭(Type Aliases)을 생성합니다. 이는 기본적으로 기존 타입에 새로운 이름을 할당하는 것을 의미합니다. 타입 별칭은 기본 타입부터 복잡한 객체 리터럴 타입까지 어떤 타입도 할당할 수 있습니다.

**예시:**
```typescript
type Point = {
  x: number;
  y: number;
};

type ID = number | string;
```
**특징:**
- **유니온 타입(Union Types):** `type`은 유니온이나 인터섹션 같은 복합 타입을 만드는 데 사용될 수 있습니다.
  
  **예시:**
  ```typescript
    type StringOrNumber = string | number;
    
    function logMessage(message: StringOrNumber) {
      console.log(message);
    }
    
    logMessage("Hello, World!"); // 문자열 가능
    logMessage(100); // 숫자도 가능
  ```
- **특정성:** 복잡한 객체 타입을 정의할 때 사용될 수 있으며, 함수 시그니처(function signatures) 또한 포함할 수 있습니다.

  **예시:**
  ```typescript
    type User = {
      name: string;
      age: number;
      getAddress: () => string;
    };
    
    const user: User = {
      name: "Jane Doe",
      age: 30,
      getAddress: () => "123 Main St",
    };
    
    console.log(user.name); // "Jane Doe"
    console.log(user.getAddress()); // "123 Main St"
  ```
- **확장 불가능:** 일단 생성되면, 다른 타입을 확장하거나 수정할 수 없습니다. 즉, 확장보다는 재할당을 통해 수정해야 합니다.
  
  **예시:**
  ```typescript
  type Point2D = {
    x: number;
    y: number;
  };
  
  // Point2D를 확장할 수 없으므로 새로운 타입을 정의합니다.
  type Point3D = {
    x: number;
    y: number;
    z: number;
  };
  // 또는, & 연산자를 사용해 Point2D 타입과 새로운 속성을 결합할 수 있습니다.
  type ExtendedPoint3D = Point2D & { z: number };

  const point3D: ExtendedPoint3D = { x: 1, y: 2, z: 3 };
  ```




### `interface`
`interface`는 객체 타입을 위해 설계되었으며, 주로 객체의 형태를 설명할 때 사용됩니다. 인터페이스는 확장이 가능하며, 상속을 통해 다른 인터페이스를 확장하거나, 클래스가 구현할 수 있습니다.

**예시:**
```typescript
interface Point {
  x: number;
  y: number;
}

interface Point3D extends Point {
  z: number;
}

class Coord implements Point3D {
  x: number;
  y: number;
  z: number;
}
```

**특징:**
- **확장 가능:** 인터페이스는 다른 인터페이스를 확장할 수 있으며, 이를 통해 코드 재사용성과 유지보수성을 높일 수 있습니다.

  **예시:**
  ```typescript
  interface Point2D {
    x: number;
    y: number;
  }
  
  // Point2D를 확장하여 Point3D 인터페이스를 생성
  interface Point3D extends Point2D {
    z: number;
  }
  
  const point: Point3D = { x: 1, y: 2, z: 3 };
  ```
  
- **클래스 구현:** 클래스가 인터페이스를 구현하도록 강제함으로써, 특정 구조와 계약을 준수하도록 할 수 있습니다.

  **예시:**
  ```typescript
    interface Movable {
    speed: number;
    move(): void;
  }
  
  // Movable 인터페이스를 구현하는 클래스
  class Car implements Movable {
    speed: number;
  
    constructor(speed: number) {
      this.speed = speed;
    }
  
    move() {
      console.log(`Moving at speed: ${this.speed}`);
    }
  }
  
  const myCar = new Car(60);
  myCar.move(); // "Moving at speed: 60"
  ```
  
- **선언 병합(Declaration Merging):** 같은 이름의 인터페이스를 여러 번 선언하면, 자동적으로 병합되어 확장됩니다.

  **예시:**
  ```typescript
  interface User {
    name: string;
  }
  
  interface User {
    age: number;
  }
  
  // User 인터페이스는 자동으로 병합되어 name과 age 속성을 모두 포함합니다.
  const user: User = {
    name: "Jane Doe",
    age: 30,
  };
  
  console.log(user); // { name: "Jane Doe", age: 30 }
  ```  


### 주요 차이점:
- **확장성:** `interface`는 확장 가능하지만, `type`은 불가능합니다.
- **유니온/인터섹션 타입:** `type`은 유니온과 인터섹션 타입을 생성할 수 있지만, `interface`는 할 수 없습니다.
- **선언 병합:** `interface`는 같은 이름으로 선언될 경우 자동으로 병합되지만, `type`은 그렇지 않습니다.

두 키워드 모두 강력하고 유연한 타입 시스템을 제공합니다. 일반적으로 객체 형태를 정의하고 확장성이 중요할 때는 `interface`를 사용하고, 유니온이나 인터섹션 같은 복잡한 타입을 정의할 때는 `type`을 선호하는 것이 일반적입니다. 그러나 프로젝트의 요구사항과 개발자의 선호에 따라 선택할 수 있습니다.
