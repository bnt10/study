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
