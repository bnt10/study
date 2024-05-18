# msw
Mock Service Worker (MSW)는 브라우저와 Node.js에서 API 목업을 만들기 위한 도구입니다. 
이를 사용하면 실제 서버 없이도 API 요청을 가로채고, 원하는 응답을 반환할 수 있습니다.
보통 벡엔드 api이 다 개발이 되지않아서 모의 데이터를 만들어야 할때 사용합니닫.

## msw 설치
```
npm install msw --save-dev
or 
yarm add -D msw
```

## mocks 디렉토리 생성
```
mkdir src/mocks
```
## browser.ts 생성
```
touch /src/mocks/browser.ts

import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

## handlers.ts 작성
```
touch src/mocks/handlers.ts

import { rest } from 'msw'
export const handlers = [
  rest.get('/api/account/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: {
            id: 1,
          },
        },
      })
    )
  })
  ]
```

## index.ts 생성
```
if (typeof window === 'undefined') {
  const server = import('./server')
  server.then((s) => s.server.listen())
} else {
  const worker = import('./browser')
  worker.then((w) => w.worker.start())
}

export {}
```
## server.ts 생성
```
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

## _app.tsx 수정
```
// 추가
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function App({component}) {}
```

## .env 생성
```
NEXT_PUBLIC_API_MOCKING=enabled
```

## Browser환경을 위한 serviceWorker 생성
```
npx msw init public/ --save
```

## package.json에 msw workingDirectory 설정
```
  "msw": {
    "workerDirectory": "public"
  },
```

## 적용코드
https://github.com/bnt10/nextjs/releases/tag/v1.0-msw

