# msw
Mock Service Worker (MSW)는 브라우저와 Node.js에서 API 목업을 만들기 위한 도구입니다. 
이를 사용하면 실제 서버 없이도 API 요청을 가로채고, 원하는 응답을 반환할 수 있습니다.

## msw 설치
```
npm install msw --save-dev
```

## mocks 디렉토리 생성
```
mkdir src/mocks
```

## handlers.ts 파일 생성
```
touch src/mocks/handlers.ts
```

## handlers.ts 작성
```
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

## sserver && browser 환경 설정
```
touch src/mocks/server.ts

// src/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers)
```

```
src/mocks/index.ts
async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
  } else {
    const { worker } = await import('./browser')
    worker.start()
  }
}

initMocks()

export {}
```
```
npx msw init <PUBLIC_DIR> --save
npx msw init public/ --save

touch src/mocks/browser.ts

// src/mocks/browser.ts
import { setupWorker } from 'msw'
import { handlers } from './handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)


// src/pages/_app.tsx

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}


```

## nextjs 설정
```
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_MOCKING: 'enabled',
  },
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
```

## env 파일 생성
```
//.env.development
NEXT_PUBLIC_API_MOCKING=enabled
```
