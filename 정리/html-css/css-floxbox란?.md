# Floxbox란?

## Floxbox란?

Flexbox는 요소들의 위치와 크기를 유연하게 조정 할 수 있도록 해줍니다.

Flexbox는 컨테이너와 그 안에 들어가는 아이템으로 구성됩니다.
컨테이너는 `display: flex;` 속성을 추가하면 그 내부에 포함되는
아이템들이 `flex itmes`로서 동작하게 됩니다.

내부를 유연하게 조정하기 위해서 Flexbox는 주축과 교차축을 기준으로
정렬 할 수 있습니다. 이때 주축을 따라서 정렬할 때는 `justify-content` 속성을 교차축을 따라 정렬할 때는 `align-itmess` 또는 `align-content` 속성을 사용합니다.

### Container

#### justify-conent

이 속성은 주축을 따라 정렬할때 내부의 아이템들의 수평 방향으로
어떻게 정렬할지를 설정합니다. 정렬에 사용되는 세부 속성은 다음과 같습니다.

- flex-start: 아이템들을 컨테이너의 시작 부분으로 정렬합니다.
- flex-end: 아이템들을 컨테이너으ㅢ 끝 부분으로 정렬합니다.
- center: 아이템들을 수평 중앙으로 정렬합니다.
- space-between: 첫 번째 아이템은 컨테이너의 시작 부분에, 마지막은 컨테이너의 끝 부분에 정렬되고, 나머지는 균등분배 됩니다.
- space-around: 아이템들을 동일한 간격으로 정렬하되, 컨테이너의 양쪽 끝과 아이템들 사이에 동일한 간격이 존재하도록 정렬합니다. 즉, 아이템과 컨테이너 가장자리 사이의 간격이 동일합니다.
- space-evenly: 아이템들을 동일한 간격으로 정렬하되, 컨테이너의 양쪽 끝과 아이템들 사이에 동일한 간격이 존재하도록 정렬합니다. 아이템과 컨테이너 가장자리 사이의 간격은 아이템 간격의 절반입니다.

#### align-itmes

이 속성은 Flex 컨테이너 내부의 아이템들을 수직 방향으로 어떻게
정렬할지를 설정합니다.

- stretch: 아이템들의 높이를 컨테이너의 높이에 맞게 늘립니다.
- flex-start: 아이템들을 컨테이너 시작 부분으로 정렬합니다.
- flex-end: 아이템들을 컨테이너의 끝 부분으로 정렬합니다.
- center: 아이템들을 수직 중앙으로 정렬합니다.
- baseline: 아이템들의 기준선을 맞춰 정렬합니다.

#### align-content

이 속성은 Flex 컨테이너 내부의 여러 row, column 사이의 간격을 조절 하는데 사용됩니다.

- stretch: 기본값으로 설정되어 있으며, 아이템들을 Flex 컨테이너의 높이에 맞게 늘립니다.
- flex-start: 아이템들을 Flex 컨테이너의 시작 부분으로 정렬합니다.
- flex-end: 아이템들을 Flex 컨테이너의 끝 부분으로 정렬합니다.
- center: 아이템들을 수직 방향으로 중앙에 정렬합니다.
- space-between: 첫 번째 줄은 Flex 컨테이너의 시작 부분에, 마지막 줄은 Flex 컨테이너의 끝 부분에 정렬되고, 나머지 줄들은 공간을 동일하게 배분하여 정렬합니다.
- space-around: 아이템들을 동일한 간격으로 정렬하되 동일한 간격으로 정렬합니다.

#### align-items vs algin-content

Flexbox에서 align-items와 align-content 속성은 모두 Flex 컨테이너 내부의 아이템들을 수직 방향으로 정렬하기 위한 속성입니다.

align-items 속성은 Flex 컨테이너 내부의 아이템들을 각각의 행(row) 또는 열(column)에 대해 정렬합니다. align-items는 Flex 컨테이너 내부에서 아이템들이 차지하는 공간을 설정하며, 각각의 행 또는 열에 대해 적용됩니다.

반면 align-content 속성은 Flex 컨테이너 내부의 모든 아이템들을 한 번에 정렬합니다. align-content는 Flex 컨테이너 내부의 모든 행 또는 열에 대해 적용되며, 이 속성을 사용하여 Flex 컨테이너의 여유 공간을 설정할 수 있습니다.

### items

컨테이너 내부의 아이템의 크기를 조절할 때 `flex`속성을 사용하는데,
이 속성은 아이템의 너비,높이, 또는 비율을 조정할 수 있습니다.

아래는 간단하게 `flex` 속성을 이용한 컨테이너 내부의 아이템 크기를 조절 하는 예시 입니다.

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

```css
.container {
  display: flex;
}

.item:nth-child(1) {
  flex: 1;
}

.item:nth-child(2) {
  flex: 2;
}

.item:nth-child(3) {
  flex: 3;
}
```

위 예시에서 `item:nth-child(1)` 의 `flex: 1;`은 전체 Flex 합
6의 1/6의 너비를 가진다는걸 의미합니다.
이 처럼 flex를 지정해주면 간단하게 비율을 지정할 수 있기에 특히 모바일 디바이스의 뷰포트(viewport)에 대응하기 용의합니다.
