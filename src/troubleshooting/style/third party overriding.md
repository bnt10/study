# Third party library에 대한 style overriding

## 문제
react-calendar라는 외부 라이브러리를 사용하였습니다. App의 전체적인 style은 tailwindcss로 구성되어 있어 react-calendar library의 style에 대한 변경이 제한적
```javascript
<Calendar
    locale={'en'}
    calendarType={'gregory'}
    className={'pt-20px'}
    onChange={onChange}
    value={value}
    next2Label={null}
    prev2Label={null}
    navigationLabel={CalendarNavigation}
  />
```

위 코드와 같이 className으로 전달 tailwindcss를 적용하는경우 하위 컴포넌트 style 변경이 불가능


## 해결책
### 1차 시도 (global css)

먼저 해당 App이 Next.js 기반으로 구성되어 global.css 형태로 react-calendar style이 변경가능하나 Calendar를 사용하지 않는 컴포넌트에도 전역적으로 css가 import되는 부분이 발생하여
컴포넌트 단위로 구성할 수 있는 module.css 형태로 변경 시도

### 2차 시도 (module.css)
module.css로 변경하여 컴포넌트 단위로 css 적용은 가능하나
```javascript
 .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
```
위 코드 처럼 Calendar component 내부의 style을 변경할 수 없었습니다.

### 3차 시도 (styled)
styled component로 Calendar Component를 감싸서 하위에 있는 style에 접근 할 수 있도록 코드를 변경했습니다.
```javascript
import Calendar from 'react-calendar'
import styled from 'styled-components'

const StyledCalendar = styled(Calendar)`
  &.react-calendar {
    max-width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    padding-top: 9px;
    padding-right: 15px;
    padding-bottom: 23px;
    background: #363636;
    border: none;
    border-radius: 0.25rem;
    color: white;
    max-width: 327px;
    box-sizing: border-box;
  }
export default StyledCalendar
```

```javsciprt
#styled로 wrapping한 Calendar Component
<StyledCalendar
  locale={'en'}
  calendarType={'gregory'}
  onChange={onChange}
  value={value}
  next2Label={null}
  prev2Label={null}
  navigationLabel={CalendarNavigation}
/>
```
위와 같이 styled로 Calendar를 감싸면 Calendar의 style 변경 가능
단 react-calendar와 같이 최상위 className의 경우 `&` 연산자를 이용해서 자기 자신임을 표시해야 합니다.

