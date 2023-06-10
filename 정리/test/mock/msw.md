# msw 설치
```
npm install msw --save-dev
```

# mocks 디렉토리 생성
```
mkdir src/mocks
```

# handlers.ts 파일 생성
```
touch src/mocks/handlers.ts
```

# handlers.ts 작성
```
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
