# MJS와 CJS에 대한 설명

| 구분     | MJS (ES Module)                                                                                                                                                          | CJS (CommonJS)                                                                                                |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **정의** | ES6에서 도입된 모듈 시스템. `import`와 `export`를 사용하여 모듈을 관리.                                                                                                  | Node.js에서 널리 사용되는 모듈 시스템. `require`와 `module.exports`를 사용하여 모듈을 관리.                   |
| **장점** | - 정적 분석 가능: 빌드 타임에 모듈 의존성을 분석하여 최적화 가능 - 트리 쉐이킹 지원: 사용되지 않는 코드 제거 가능 - 표준화된 문법: 브라우저와 Node.js에서 모두 사용 가능 | - 간단하고 직관적인 문법 - 동적 로딩 가능: 런타임에 조건에 따라 모듈 로드 가능 - Node.js와의 완벽한 호환성    |
| **단점** | - 동적 로딩이 제한적 - Node.js의 구 버전에서는 사용 불가능 - 브라우저 환경에서 사용 시 번들링 필요                                                                       | - 정적 분석 불가능: 빌드 타임 최적화 어려움 - 트리 쉐이킹 불가능 - 비표준 문법: 브라우저에서 직접 사용 불가능 |
| **설정** | - Node.js: `package.json`에 `"type": "module"` 추가 - 파일 확장자: `.mjs` 사용 가능                                                                                      | - Node.js: 별도 설정 없이 사용 가능 - 파일 확장자: `.js` 사용 가능                                            |

### 예제 코드

#### MJS (ES Module)

**파일명:** `example.mjs`

```typescript
// math.mjs
export function add(a, b) {
  return a + b;
}

export const PI = 3.14;

// main.mjs
import { add, PI } from './math.mjs';

console.log(add(2, 3)); // 5
console.log(PI); // 3.14
```

#### CJS (CommonJS)

**파일명:** `example.js`

```typescript
// math.js
function add(a, b) {
  return a + b;
}

const PI = 3.14;

module.exports = { add, PI };

// main.js
const { add, PI } = require('./math.js');

console.log(add(2, 3)); // 5
console.log(PI); // 3.14
```

### 설정 방법

#### Node.js에서 MJS 설정

`package.json` 파일에 다음을 추가합니다:

```json
{
  "type": "module"
}
```

이렇게 하면 `.js` 파일도 ES 모듈로 해석됩니다. 특정 파일만 ES 모듈로 사용하려면 `.mjs` 확장자를 사용합니다.

#### CJS는 별도의 설정 없이 바로 사용할 수 있습니다.

이 표와 설명이 MJS와 CJS에 대한 이해를 돕기를 바랍니다. 필요에 따라 두 모듈 시스템 중 적합한 것을 선택하여 사용하시면 됩니다.
