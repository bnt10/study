# 오류발생
Next.js에서 styledComponent 사용중 아래 경고 출력

`client.js:1 Warning: Prop `className` did not match. Server: ...`

# 원인
nextjs에서는 최초 랜더링의 경우 Server Side로 동작 
이후 Client에서 Client Side로 동작하게 되어 해시 + 클래스명이 달라지게 때문에 발생

# 해결방법
Next.js의 `next.config.js`파일에 compiler 옵션에  styledComponents: true, 추가


```javascript
module.exports = withBundleAnalyzer({
  ...
  compiler: {
    styledComponents: true, // 추가 옵션
  },
});

```
