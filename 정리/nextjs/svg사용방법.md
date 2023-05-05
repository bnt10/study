# next에서 svg 사용하기

## @svgr/webpack 설치
```
npm i -D @svgr/webpack
```
## next.config.js 수정
```javascript
module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
});
```
## 사용

```
import googleLoginIcon from '@/public/assets/images/google-icon.svg'
```
