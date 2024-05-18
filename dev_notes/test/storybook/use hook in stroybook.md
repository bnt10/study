# Storybook에서 customHook 사용하기

## storybook version
```json
  "storybook": "7.6.6",
```

## 예시 코드
```typescript
import type { Meta, StoryFn } from '@storybook/react'
import SearchFormOptions from 'components/search/SearchFormOptions'
import { SearchSchema } from 'constants/search/schema'
import { useForm } from 'hooks/useForm'
import React from 'react'

const meta: Meta<typeof SearchFormOptions> = {
  title: 'Search/Options',
  component: SearchFormOptions,
  tags: ['autodocs'],
}

export default meta

// StoryFn을 사용하여 스토리를 정의합니다.
export const Default: StoryFn<typeof SearchFormOptions> = (args) => {
  // 필요한 hooks를 여기에 추가합니다.
  const { getFormFields, handleOnChange } = useForm(SearchSchema)

  // SearchFormOptions 컴포넌트에 필요한 props와 함께 상태를 전달합니다.
  return (
    <SearchFormOptions
      {...args}
      getFormFields={getFormFields}
      handleOnChange={handleOnChange}
    />
  )
}

```
