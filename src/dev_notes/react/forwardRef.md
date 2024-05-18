# forwardRef

`forwardRef`는 React 컴포넌트가 `ref`를 하위 컴포넌트로 전달할 수 있게 해주는 함수입니다. 기본적으로 컴포넌트는 `props`를 통해 데이터를 전달받지만, `ref`는 `props`처럼 일반적인 흐름을 따르지 않습니다. `forwardRef`를 사용하면 부모 컴포넌트로부터 받은 `ref`를 자식 컴포넌트에게 전달할 수 있습니다.

### 예시

TypeScript를 사용한 `forwardRef`의 간단한 예시입니다:

```typescript
import React, { forwardRef } from 'react';

const FancyButton = forwardRef<HTMLButtonElement, {}>((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

export default FancyButton;
```

위 예시에서 `FancyButton` 컴포넌트는 부모 컴포넌트로부터 받은 `ref`를 내부의 `button` 요소에 연결합니다. 이를 통해 부모 컴포넌트는 `FancyButton`을 통해 내부 
`button` 요소에 직접 접근할 수 있게 됩니다.
