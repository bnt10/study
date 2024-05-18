# useInfiniteScroll
`useInfiniteScroll`은 커스텀 훅으로, 주어진 대상 요소가 화면에 나타나는 순간을 감지하여 특정 콜백 함수를 실행하는 기능을 수행합니다. 
이 훅은 무한 스크롤 기능을 구현할 때 유용하게 사용될 수 있습니다. 

### 매개변수 (UseInfiniteScrollProps):
- `target`: 감시할 대상 요소의 참조. `RefObject<HTMLDivElement | null>` 타입을 가집니다.
- `parent`: 감시 범위를 제한할 부모 요소. 기본값은 `null`로, 뷰포트를 기준으로 감시합니다.
- `threshold`: 대상 요소가 얼마나 뷰포트에 들어와 있는지의 비율을 나타내는 임계값. 기본값은 `0.1`입니다.
- `rootMargin`: 감시 영역의 마진을 지정합니다. 기본값은 `'0px'`입니다.
- `callback`: 대상 요소가 뷰포트에 들어올 때 실행될 콜백 함수.

### 기능 구현 (useEffect 내부):
1. **옵션 설정**: `opts` 객체를 생성하여 `IntersectionObserver`의 설정을 정의합니다. 여기에는 `root`, `rootMargin`, `threshold` 값이 포함됩니다.

2. **Intersection Observer 생성**: `IntersectionObserver` 인스턴스를 생성하고, 각 감시 대상에 대한 콜백 함수를 정의합니다. 이 콜백에서는 대상 요소가 교차하는지 여부(`isIntersecting`)에 따라 상태를 업데이트하고, 교차한다면 제공된 `callback` 함수를 실행합니다.

3. **대상 요소 감시 시작**: `observer.current`를 사용하여 `target.current` 요소를 감시하기 시작합니다. 이는 대상 요소가 뷰포트 내로 들어올 때마다 감지됩니다.

4. **정리 (Cleanup)**: 컴포넌트가 언마운트되거나 의존성이 변경될 때마다, `observer.current`의 `disconnect` 메소드를 호출하여 기존의 감시를 중단합니다. 이는 메모리 누수를 방지하고, 불필요한 감시가 계속되는 것을 막습니다.

### 반환값:
- `isIntersecting`: 대상 요소가 뷰포트에 들어와 있는지 여부를 나타내는 `boolean` 값입니다. 이 값은 대상 요소가 뷰포트에 교차할 때 `true`가 되고, 교차하지 않을 때 `false`가 됩니다. 이 상태는 컴포넌트에서 무한 스크롤 로직을 구현할 때 사용될 수 있습니다.

이 커스텀 훅을 사용함으로써, 무한 스크롤 기능을 필요로 하는 다양한 컴포넌트에서 복잡한 교차 감지 로직을 직접 구현하지 않고도, 이 기능을 쉽게 재사용할 수 있게 됩니다.

```typescript
// useInfiniteScroll.ts
import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface UseInfiniteScrollProps {
  target: RefObject<HTMLDivElement | null> // or HTMLElement, depending on your use case
  parent?: Element | null // Parent element for the Intersection Observer
  threshold?: number // Threshold for the Intersection Observer
  rootMargin?: string // Root margin for the Intersection Observer
  callback: () => void // Callback function to be called when the target is intersecting
}

const useInfiniteScroll = ({
  target,
  parent = null,
  threshold = 0.1,
  rootMargin = '0px',
  callback,
}: UseInfiniteScrollProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (target && !target.current) {
      return
    }
    const opts: IntersectionObserverInit = {
      root: parent,
      rootMargin,
      threshold,
    }
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        callback()
      } else {
        setIsIntersecting(false)
      }
    }, opts)

    if (target.current) {
      observer.current.observe(target.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [target, parent, threshold, rootMargin, callback])

  return isIntersecting
}

export default useInfiniteScroll

```
