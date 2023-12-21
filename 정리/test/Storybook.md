Next.js에서 Tailwind CSS와 함께 Storybook을 사용하는 방법은 다음과 같습니다.

# 설치 및 설정

### 1. 필요한 패키지 설치

먼저, Next.js 프로젝트에 필요한 패키지들을 설치해야 합니다.

```bash
# Tailwind CSS 설치
npm install tailwindcss postcss autoprefixer

# Storybook 설치
npx sb init

# 필요한 추가 패키지 설치
npm install @storybook/addon-postcss
```

### 2. Tailwind CSS 설정

Tailwind CSS를 설정하기 위해 `tailwind.config.js`와 `postcss.config.js` 파일을 생성하고 설정합니다.

```bash
npx tailwindcss init -p
```

이 명령어는 위의 두 파일을 생성하며, `tailwind.config.js`에는 기본 설정이 포함되어 있습니다.

### 3. Tailwind CSS를 Global Styles에 적용

`styles` 폴더에 `globals.css` 파일을 생성하거나 수정하여 Tailwind의 기본 스타일을 적용합니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Storybook 설정

Storybook을 Next.js와 함께 사용하기 위해 `.storybook/main.js` 파일을 수정합니다. PostCSS와 Tailwind CSS를 사용하도록 설정합니다.

```javascript
module.exports = {
  // 기타 Storybook 설정
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-postcss'],
  webpackFinal: async (config, { configType }) => {
    // Tailwind CSS와 PostCSS 설정을 여기에 추가
    return config;
  },
};
```

### 5. 컴포넌트 작성 및 Storybook에서 확인

이제 Next.js의 컴포넌트를 작성하고 Tailwind CSS 클래스를 사용하여 스타일링할 수 있습니다. 그 후, 해당 컴포넌트에 대한 Storybook 스토리를 작성하여 UI를 확인합니다.

### 6. Storybook 실행

모든 설정이 완료되면 Storybook을 실행하여 UI 컴포넌트를 확인합니다.

```bash
npm run storybook
```

# Story 작성

TypeScript를 사용하여 컴포넌트와 Storybook 스토리를 작성하는 방법을 보여드리겠습니다. 이 예시에서는 앞서 언급한 버튼 컴포넌트를 TypeScript로 변환합니다.

### 단계 1: 컴포넌트 생성

먼저, `Button.tsx` 파일을 생성합니다.

```tsx
// components/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary' }) => {
  const baseStyle = 'rounded px-4 py-2 text-white font-bold';
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-700',
    secondary: 'bg-gray-500 hover:bg-gray-700'
  };

  const styles = `${baseStyle} ${variantStyles[variant]}`;

  return (
    <button className={styles}>
      {children}
    </button>
  );
};

export default Button;
```

### 단계 2: Storybook 스토리 작성

다음으로, Storybook 스토리를 작성합니다. 이를 위해 스토리 파일에 타입을 적용합니다.

```tsx
// stories/Button.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
};
```

### 단계 3: Storybook 실행


```bash
npm run storybook
```

이제 버튼 컴포넌트와 그에 대한 스토리를 Storybook에서 볼 수 있습니다.


# 전역 상태 관리

Storybook에서 Recoil과 같은 전역 상태 관리를 주입하려면 다음과 같은 과정이 필요합니다. 
`RecoilRoot`를 스토리에 포함시키고, 필요한 경우 초기 상태를 설정해야 합니다. 여기에는 몇 가지 단계가 있습니다.


### 1. Storybook의 Decorators 사용

Decorators는 스토리를 렌더링할 때 반복되는 컨텍스트를 제공합니다. `RecoilRoot`를 전역 또는 특정 스토리에 Decorator로 추가하여 각 스토리가 Recoil 상태를 사용할 수 있도록 합니다.

#### 전역 Decorator 설정 (`/.storybook/preview.js`)

모든 스토리에 대해 `RecoilRoot`를 적용하려면, `.storybook/preview.js` 파일에 전역 Decorator를 추가합니다.

```javascript
import React from 'react';
import { RecoilRoot } from 'recoil';

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  ),
];
```

### 2. 특정 스토리에 Recoil 적용

특정 스토리에만 Recoil을 적용하려면, 해당 스토리 파일에 직접 Decorator를 추가할 수 있습니다.

```tsx
// 예시: Button.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { RecoilRoot } from 'recoil';
import Button from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [(Story) => <RecoilRoot><Story/></RecoilRoot>],
} as Meta;

const Template: Story = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click me',
};
```

### 3. 초기 상태 설정

스토리에서 특정 Recoil 상태의 초기 값을 설정하려면, `RecoilRoot`의 `initializeState` 속성을 사용할 수 있습니다.

```tsx
export const decorators = [
  (Story) => (
    <RecoilRoot initializeState={({ set }) => {
      // 여기에서 초기 상태를 설정합니다.
      set(someAtom, initialValue);
    }}>
      <Story />
    </RecoilRoot>
  ),
];
```

### 4. 상태 변경 반영

컴포넌트가 Recoil 상태에 의존하는 경우, 스토리에서 해당 상태를 변경하고 결과를 확인하려면 컴포넌트와 연결된 상태를 적절히 조작해야 합니다. 이는 사용자 상호작용을 모의하거나, 특정 상태에서 컴포넌트의 렌더링 결과를 확인하는 데 유용할 수 있습니다.


