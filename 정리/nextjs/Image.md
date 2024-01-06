# Next.js에서의 Image

## 무엇을 해결할 수 있는가
1. **Layout Shift 방지**  
   Layout Shift는 `이미지로딩`, `폰트변경`, `동적 컨테츠 삽입으로 인한 DOM`의 변화로 발생할 수 있습니다.
   그렇다면 이러한 Layout Shift의 문제 무엇일까요?
   
   ## 문제
   - **성능 이슈:**  
      Layout이 변경되면 브라우저는 이를 다시 연산해서 그리는 Repaint가 발생합니다.이는 많은 브라우저 연산의 큰 비용을 차지하는 과정으로
      만약 많은 요소에 Layout Shift가 발생하는 경우 성능 이슈가 발생할 수 있습니다.

   - **부정적 사용자 경험**  
      Layout Shift 발생은 사용자에게 부정적인 UX를 제공할 수 있습니다. 사용자가 설명문을 읽고 있는 도중 설명문에 포함된 도표와 같은 이미지가
      나중에 로딩되어 Layout이 변경되는 경우 기존 설명문의 위치가 변경 될 수 있어서 사용자에게 불편감을 유발하게 됩니다.

   ## 해결
   이미지에 대한 Layout Shift를 방지하는 방법은 미리 그려질 요소에 대한 크기를 정하는 방법으로 해결 할 수 있습니다.  
   예를 들어 `width:'100px', height:'100px'` 인 `image`가 동적으로 추가될 페이지가 있다면 Layouf Shift가 발생하는 이유인  
   이미지 로딩에 의한 레이아웃 변경이라면 이 이미지의 크기를 미리 `width:'100px', height:'100px'`로 정해 놓는다면 발생하지 않게 됩니다.  
   그렇기 때문에  Next.js의 Image Compoent에서는 `width`와 `height` Required된 Props로 가집니다.  
   
   ### Next.js Image Component Props
   |Prop|Example|Type|Status|
   |:---|:---:|:---:|:--:|
   |width|width={500}|Integer (px)|Required|
   |height|height={500}|Integer(px)|Required|

   ```typescript
   import Image from 'next/image'
 
   export default function Page() {
    return (
      <Image
        src="path
        alt="Picture of the author"
        width={500}
        height={500}
      />
      )
    }
   ```

   하지만 이미지의 사이즈를 미리 알 수 없는 경우가 발생한다면 어떻게 해야 할까요?
   이런 경우 몇가지 선택지가 있습니다.
   1. fill prop 사용
      fill prop를 사용하게 되면 Image component는 부모 요소의 크기에 맞추게 됩니다.
      여기서 fill prop를 사용할때 몇가지 주의사항이 있습니다.
      - width, height:  
        fill 속성을 사용하는경우 width,height와 같이 사용 할 수 없습니다.
        
        <img width="648" alt="image" src="https://github.com/bnt10/study/assets/43377349/e15b5208-978d-4dd1-b7ce-83a5bd52c9b3">
      - objectFit:
        objectFit에 대한 상세한 숙지가 필요합니다. 
        * fill: 이 값은 이미지의 원래 비율을 무시하고, 컨테이너의 전체 공간을 채우도록 이미지를 늘리거나 줄입니다. 이미지가 왜곡될 수 있습니다.  
        * contain: 이미지의 비율을 유지하면서 컨테이너에 맞추어 이미지를 확대하거나 축소합니다. 이미지가 컨테이너의 모든 공간을 채우지는 못할 수 있으며, 빈 공간이 남을 수 있습니다.  
        * cover: 이미지의 비율을 유지하면서 컨테이너의 전체 공간을 채웁니다. 이미지가 컨테이너보다 크면 이미지의 일부가 잘릴 수 있습니다. 일반적으로 이미지의 중심부가 보여지는 것을 우선시합니다.  
        * none: 이미지를 크기 조정하지 않습니다. 이미지가 원래의 크기로 표시되며, 컨테이너보다 크거나 작을 수 있습니다.  
   2. 미리 서버에서 이미지의 사이즈를 조절해서 저장합니다.
   3. api요청 시 사이즈를 지정할 수 있도록 서버 api를 수정합니다.   
