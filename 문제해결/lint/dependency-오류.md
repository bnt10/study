# 문제
development에서만 사용할 msw에 대해서 아래 오류가 발생
```
'msw' should be listed in the project's dependencies, not devDependencies.eslintimport/no-extraneous-dependencies
```
# 해결
JavaScript와 TypeScript에서는 모듈을 로드할 때 import 문을 사용합니다. 예를 들어, msw 라이브러리를 사용하려면 다음과 같이 코드를 작성할 수 있습니다:
```
import { setupWorker } from 'msw'
```
그런데 이렇게 코드를 작성하면 ESLint는 이 모듈이 package.json 파일의 
dependencies에 정의되어 있는지 확인합니다. 
만약 msw가 devDependencies에만 정의되어 있다면, 
"import/no-extraneous-dependencies" 규칙에 따라 이는 문제가 될 수 있습니다. 
왜냐하면 이 규칙은 모듈이 dependencies, peerDependencies, optionalDependencies 중 하나에 포함되어야 한다고 요구하기 때문입니다.

따라서 이를 해결 하기 위해서는 ESLint 구성에서 "import/no-extraneous-dependencies" 규칙에
{ "devDependencies": true } 옵션을 전달하면, devDependencies에 정의된 모듈도 import 할 수 있게 됩니다. 


## .eslintrc에 msw 관련 rule을 추가
```

// Configuration for msw
{
  "files": ["**/mocks/**"],
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ]
  }
},

```
