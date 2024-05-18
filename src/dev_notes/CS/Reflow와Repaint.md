# 리플로우(Reflow)
리플로우(Reflow)는 요소의 위치나 크기 등의 레이아웃 변경이 일어났을 때 실행됩니다.
DOM의 변화가 페이지의 레이아웃에 영향을 미칠 때마다 발생하며 이는 발생 상황은 다음과 같습니다.

- 요소의 추가, 삭제 또는 변경
- 요소의 위치 변경
- 요소의 크기 변경(padding, margin, border, width, height)등
- 페이지 초기 렌더링
- 윈도우 또는 프레임의 크기 변경
- 폰트 변경

Reflow는 매우 비용이 큰 작업이며, 인접 요소까지 영향을 받을 수 있습니다.

# 리페인트(Repaint)
리페인트(Repaint)는 요소의 레이아웃은 변하지 않지만 시각적인 표현만 변경되는 경우를 말합니다.
예를 들어서 색상 변경, 그림자 추가등 시각적인 부분만 변경될 때 발생합니다.

- 색상 변경
- 배경 이미지 변경
- 가시성 변경

리플로우(Reflow)가 발생하면 그 후에 자동으로 Repaint가 일어나지만, Repaint는 레이아웃
변경 없이 독립적으로 일어 날 수 있습니다.

# 최적화
결국 리플로우(Reflow)는 자원이 많이 필요한 큰 작업이라 이해했다면 웹의 최적화를 위해서는
이 리폴로우(Reflow) 발생이 적어지도록 작성하는 것이 중요합니다.

- 레이아웃 변경을 최소화하고 일괄적으로 변경 합니다.
- 클래스와 스타일 변경을 일괄적으로 처리하여 불필요한 Reflow를 방지합니다.
- 복잡한 애니메이션의 경우 will-change CSS 사용을 고려합니다.

  ## will-change CSS
  will-change 속성은 CSS의 성능 최적화를 위해 디자인된 속성입니다. 개발자가 브라우저에게 어떤 요소가 곧 변할 것임을 미리 알려줌으로써
  브라우저는 해당 요소에 대한 최적화를 미리 준비할 수 있습니다. 
 
  ## 예시
  `will-change` 속성을 사용하는 예시입니다.
  이 예시에서는 웹 페이지의 특정 요소에 마우스 오버 시 스케일 변화와 투명도 변화를 주는 애니메이션을 적용하겠습니다.
  `will-change` 속성을 사용하여 브라우저가 이 변화에 대해 미리 최적화할 수 있도록 할 것입니다.
  
  ### HTML 구조:
  ```html
  <div class="animated-element">Hover over me!</div>
  ```
  
  ### CSS 스타일:
  ```css
  .animated-element {
    width: 200px;
    height: 200px;
    background-color: rebeccapurple;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .animated-element:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
  ```
  
  이 상태에서는 `.animated-element`에 마우스를 올렸을 때 크기가 커지고(opacity) 투명도가 감소합니다.
  애니메이션을 부드럽게 하기 위해 `will-change`를 추가합니다.
  
  ### will-change 적용:
  ```css
  .animated-element {
    will-change: transform, opacity;
    /* 나머지 스타일 */
  }
  ```
  
  이제 `.animated-element`에 `will-change: transform, opacity;`를 추가했습니다.
  이는 브라우저에게 해당 요소가 변형(transform)과 투명도(opacity) 변화를 앞두고 있음을 알리는 것입니다.
  브라우저는 이 정보를 바탕으로 해당 요소에 대한 렌더링을 최적화할 수 있으며,
  사용자가 실제로 요소에 마우스를 올렸을 때 애니메이션이 더 부드럽게 작동할 수 있도록 준비할 수 있습니다.
  
  ### 주의사항:
  `will-change`는 성능 최적화를 위한 것이므로, 실제로 변화가 예상되는 요소에만 사용해야 합니다.
  너무 많은 요소에 사용하면 오히려 성능에 부정적인 영향을 줄 수 있으니 주의해야 합니다.
   또한, 애니메이션 또는 변화가 끝나면 `will-change`를 제거하여 브라우저가 불필요한 자원을 계속 할당하는 것을 방지해야 합니다.
  이를 위해 JavaScript를 사용하여 동적으로 `will-change`를 추가하고 제거하는 방법도 고려할 수 있습니다.
