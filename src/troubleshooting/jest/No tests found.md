### 문제 발생

Jest를 사용하여 테스트를 실행할 때 "No tests found, exiting with code 1" 오류가 발생했습니다. 이는 Jest가 특정 테스트 파일을 인식하지 못한 문제로 인해 발생했습니다.

### 문제 원인

문제의 원인은 Jest가 프로젝트의 테스트 파일을 인식할 수 있도록 설정이 충분하지 않았기 때문입니다. 특히, VS Code와의 통합에서 Jest가 루트 디렉토리를 올바르게 인식하지 못해 테스트를 찾지 못한 것입니다.

### 해결 방법

#### 1. `settings.json`에서 `jest.rootPath`와 `jest.jestCommandLine` 설정

VS Code에서 Jest가 테스트 파일을 올바르게 인식하고 실행할 수 있도록 `settings.json` 파일에 다음 설정을 추가해야 합니다:

```json
{
  "jest.rootPath": "src",
  "jest.jestCommandLine": "pnpm run test",
  "jest.runMode": "on-demand"
}
```

- **`jest.rootPath`:** Jest가 테스트 파일을 찾을 기본 경로를 지정합니다. 여기서는 `src` 폴더를 지정하여 프로젝트의 소스 폴더 내에서 테스트 파일을 찾도록 설정합니다.
- **`jest.jestCommandLine`:** Jest를 실행할 명령어를 지정합니다. `pnpm run test` 명령어를 통해 Jest가 올바르게 실행됩니다.

#### 2. `cross-env` 설치

Windows 환경에서는 환경 변수를 설정할 때 `cross-env` 패키지가 필요합니다. `cross-env`를 사용하여 운영체제에 관계없이 동일한 환경 변수를 설정할 수 있습니다.

```bash
npm install --save-dev cross-env
```

이를 통해 Jest가 Windows 환경에서도 문제없이 실행될 수 있도록 보장합니다.

### 결과

위의 설정을 반영하면 Jest가 테스트 파일을 올바르게 인식하고 실행할 수 있습니다. `settings.json` 파일의 `jest.rootPath`와 `jest.jestCommandLine` 설정이 문제 해결의 핵심이었으며, 추가적으로 `cross-env`를 설치하여 Windows 환경에서도 안정적인 테스트 환경을 구축할 수 있었습니다.

이로 인해 "No tests found" 오류는 해결되었으며, Jest 테스트가 성공적으로 실행될 수 있습니다.
