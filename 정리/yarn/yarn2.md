# Yarn 2

Yarn 2는 Yarn의 두 번째 메이저 버전으로 여러 개선사항과 새로운 기능이 추가 되었습니다.
주요 변경사항과 특징은 다음과 같습니다.

## 변경사항
1. Plug'n'Play(PnP) : 기존 의존성 관리는 node_modules를 통해서 관리 됩니다.
   기존 `node_modules` 몇 가지 단점이 있습니다.
   
   - 공간 낭비 : 각 프로젝트가 자신의 `node_modules` 디렉토리를 가지므로 중복된 패키지가 여러번 다운로드 됩니다.
   - 파일 시스템 성능 : 패키지가 많을 수록 설치 속도와 Windows에서 파일 시스템 성능이 저하될 수 있습니다.
   - 의존성 문제 : 중첩된 `node_modules` 디렉토리로 인해 의존성 해결이 복잡해 질 수 있습니다.
   - 호환성 : 다른 버전의 동일한 패키지가 중첩되어 설치될 수 있어 런타임에서 오류가 발생 할 수 있습니다.
   - 불명확한 상태 : `node_modules`는 프로젝트의 일부로 버전 관리가 되지 않기 때문에 다른 환경에서 동일한 상태를 재현하기 어렵습니다.
   - 임시파일 및 캐시 : 패키지 설치 과정 중 임시파일이나 캐시가 생성되는 경우 이들 파일들이 문제를 일으킬 수 있습니다.
  
  PnP는 이러한 문제를 해결되기 위해서 도입 되었습니다.

2. Zero-Installs : .yarn/cache 폴더와 .pnp.js 파일을 Git에 커밋하여 다른 개발자나 CI/CD 환경에서 yarn install 을 실행할 필요가 없게 됩니다.

3. Improved Workspaces: Yarn 2의 workspaces는 각 workspace 내의 패키지 의존성을 중앙에서 효과적으로
관리 할 수 있습니다. 예를 들어 workspace 루트에서 단일 명령으로 모든 하위 패키지를 업데이트하거나 특정 workspace에
설치된 패키지를 쉽게 확인할 수 있습니다.

4. Constraints Programming: `constraints.prop`을 통해 패키지 의존성에 대한 제약 조건을 정의합니다.
   예를 들어 패키지 A와 B가 프로젝트에서 함께 사용되는 경우 두 패키지의 버전이 서로 호환되어야 한다는 제약 조건을
   `constraints.prop` 파일에 명시 할 수 있습니다. 이렇게 하면 Yarn은 이 제약 조건을 검사하여 ㄷ두 패키지의 버전이
   호환되지 않는 경우에 경고 또는 에러를 출력합니다.

   사용 예시
   파일 내용은 Prolog와 유사한 형태로 작성됩니다.
   lodash와 react의 버전이 일치하도록 제약을 걸고 싶다면, 다음과 같이 작성할 수 있습니다.

   ```bash
   % constraints.pro 파일
   eq(dependency_type(DependencyType), dependency_type(DependencyType), dependency_target('lodash', Version), dependency_target('react', Version)).
   ```

   Yarn 2에서 이 제약 조건을 적용하려면 일반적으로 `yarn constraints` 명령을 실행합니다.
   ```bash
   yarn constraints
   ```
5. Plug-and-play Architecture : Yarn 2는 플러그인 아키텍처를 제공하여 다양한 기능을 쉽게 확장할 수 있습니다.
   이는 패키지 매니저의 기본 기능을 넘어 사용자 또는 커뮤니티가 직접 플러그인을 개발하고 추가할 수 있게 만듭니다.
   이러한 플러그인 아키텍처의 몇 가지 중요한 특징은 다음과 같습니다
   ### 플러그인 작성과 배포
    - 커스터마이징: Yarn 2 플러그인을 작성하면 사용자 정의 명령어를 추가하거나 기존 명령어의 동작을 변경할 수 있습니다.
    - 배포: 플러그인은 npm 또는 Yarn 자체의 패키지 저장소에 배포할 수 있습니다.
   ### 설치와 사용
    - 설치: Yarn 2는 yarn plugin import 명령어를 사용해 플러그인을 쉽게 설치할 수 있습니다.
      ```bash
      yarn plugin import <플러그인 이름 또는 URL>
      ```
    - 사용: 플러그인이 설치되면 Yarn 2에 통합되어 자동으로 해당 기능을 사용할 수 있습니다.

   
