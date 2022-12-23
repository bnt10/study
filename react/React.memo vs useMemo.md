# React.memo vs useMemo 

이름이 비슷하여 사용에 혼란을 가져오지 않도록 두 차이 비교 정리 하였습니다.

## React.memo
`React.memo` 는 functional component를 감싸는 고차 컴포넌트 입니다.  props에 대해서
이전 props와 다음 props를 비교해서 리렌더링 여부를 결정합니다.

`React.memo`의 사용법
```
import React from 'react';

const MyComponent = ({ data }) => {
  // render component using data
};

export default React.memo(MyComponent);
```



## useMemo
`useMemo`는 value에 대한 memoize hook 입니다. dependencies의 변경에 의해서만 다시 계산됩니다. 보통 큰 연산이 필요한 값이 리렌더링 될때 마다 다시 연산하는 것을 방지 하기 위해 사용 됩니다.

`useMemo`의 사용법

```
import { useMemo } from 'react';

const MyComponent = ({ data }) => {
  const calculatedValue = useMemo(() => {
    // perform expensive calculation using data
    return expensiveCalculation(data);
  }, [data]);

  // render component using calculatedValue
};
```





