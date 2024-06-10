### Golang 소개 및 설치

#### Golang 소개 및 역사
Golang(또는 Go)은 Google에서 개발한 오픈 소스 프로그래밍 언어입니다. 2007년에 시작되어 2009년에 공개되었으며, 주로 시스템 프로그래밍과 클라우드 서비스에 최적화되어 있습니다. Golang은 다음과 같은 주요 특징을 가지고 있습니다:

#### Golang의 주요 특징
- **정적 타입 언어**: 컴파일 시 타입 체크를 하여 안정성을 제공합니다.
- **간단하고 직관적인 문법**: 배우기 쉽고 생산성을 높입니다.
- **병행 프로그래밍 지원**: goroutine과 채널을 통해 병행 처리를 간편하게 구현할 수 있습니다.
- **빠른 컴파일 속도**: 빌드 시간이 짧고 실행 파일이 빠르게 생성됩니다.
- **크로스 플랫폼 지원**: 다양한 운영 체제에서 동일한 코드를 사용할 수 있습니다.
- **강력한 표준 라이브러리**: 다양한 기능을 제공하는 표준 라이브러리가 내장되어 있습니다.

#### 개발 환경 설정
Golang을 사용하기 위해서는 먼저 개발 환경을 설정해야 합니다. 여기서는 Windows, macOS, Linux에서 Golang을 설치하는 방법을 설명합니다.

##### Windows에 Golang 설치
1. [Golang 공식 다운로드 페이지](https://golang.org/dl/)에 접속합니다.
2. Windows용 설치 파일을 다운로드합니다.
3. 다운로드한 설치 파일을 실행하고 설치를 완료합니다.
4. 명령 프롬프트를 열고 `go version` 명령어를 입력하여 설치가 성공적으로 완료되었는지 확인합니다.

```shell
go version
```

##### macOS에 Golang 설치
1. [Golang 공식 다운로드 페이지](https://golang.org/dl/)에 접속합니다.
2. macOS용 설치 파일을 다운로드합니다.
3. 다운로드한 설치 파일을 실행하고 설치를 완료합니다.
4. 터미널을 열고 `go version` 명령어를 입력하여 설치가 성공적으로 완료되었는지 확인합니다.

```shell
go version
```

##### Linux에 Golang 설치
1. [Golang 공식 다운로드 페이지](https://golang.org/dl/)에 접속합니다.
2. Linux용 tarball 파일을 다운로드합니다.
3. 다운로드한 파일을 `/usr/local` 디렉토리에 압축 해제합니다.
4. `~/.bashrc` 파일을 열고 다음 줄을 추가하여 Go의 경로를 설정합니다.

```shell
export PATH=$PATH:/usr/local/go/bin
```

5. `source ~/.bashrc` 명령어를 실행하여 변경 사항을 적용합니다.
6. 터미널을 열고 `go version` 명령어를 입력하여 설치가 성공적으로 완료되었는지 확인합니다.

```shell
go version
```

#### Go workspace 설정(Go 1.11 이전)

Go 1.11 이후로 Go 모듈이 도입되면서 기존의 $GOPATH 기반의 워크스페이스 설정이 필수가 아니게 되었습니다. 이전에는 모든 Go 소스 코드가 $GOPATH/src에 위치해야 하고, 빌드된 실행 파일과 패키지는 각각 $GOPATH/bin과 $GOPATH/pkg에 저장되었습니다. 하지만 이제 Go 모듈을 사용하면 이러한 구조에서 벗어나 프로젝트를 어디서든 위치시킬 수 있고, 각 프로젝트 디렉토리 내에 go.mod 파일을 통해 의존성을 관리할 수 있습니다.

따라서, Go 모듈을 사용하는 현대적인 접근 방식에서는 $GOPATH 설정이 필수적이지 않습니다. 하지만 여전히 많은 기존 프로젝트와 일부 개발 환경에서는 $GOPATH를 사용할 수 있으며, 특히 Go 코드가 $GOPATH에 의존하는 라이브러리나 도구를 사용하는 경우에는 $GOPATH를 설정할 필요가 있습니다.

Golang에서 작업을 효율적으로 관리하기 위해 workspace를 설정해야 합니다. 기본적으로 Go workspace는 다음 세 가지 디렉토리로 구성됩니다:

- **src**: 소스 코드 파일이 위치하는 디렉토리
- **pkg**: 패키지 객체 파일이 위치하는 디렉토리
- **bin**: 컴파일된 실행 파일이 위치하는 디렉토리

예를 들어, 작업 디렉토리를 `~/go`로 설정하려면 다음과 같이 디렉토리를 생성합니다:

```shell
mkdir -p ~/go/{src,pkg,bin}
```

그리고 `~/.bashrc` 파일에 다음 줄을 추가하여 GOPATH를 설정합니다:

```shell
export GOPATH=~/go
export PATH=$PATH:$GOPATH/bin
```

#### Go 프로젝트 구조
Go 프로젝트를 구조화하는 방법을 간단히 소개합니다. Go는 프로젝트 구조에 대해 매우 유연하지만, 일반적으로 다음과 같은 구조를 많이 사용합니다.

```plaintext
myproject/
├── bin/
├── pkg/
└── src/
    └── myproject/
        ├── main.go
        ├── utils/
        │   └── helper.go
        └── models/
            └── data.go
```

- **bin/**: 빌드된 실행 파일이 위치합니다.
- **pkg/**: 패키지 객체 파일이 위치합니다.
- **src/**: 소스 코드가 위치합니다.

이러한 구조를 사용하면 프로젝트 관리가 더 쉬워지고, 코드가 더 체계적으로 조직됩니다.

`source ~/.bashrc` 명령어를 실행하여 변경 사항을 적용합니다.

#### Go modules 소개 및 설정(Go 1.11 이후)
Go 1.11 이후 도입된 Go 모듈 시스템은 `$GOPATH`에 의존하지 않고 패키지 의존성을 관리하는 새로운 방식을 제공합니다. 이 시스템은 각 프로젝트의 의존성을 독립적으로 관리하고, 프로젝트를 어디서든 위치시킬 수 있게 해줍니다. Go 모듈의 초기화와 관리는 `go mod init` 명령어로 시작하며, 이를 통해 생성되는 `go.mod` 파일은 프로젝트 의존성을 명시적으로 선언합니다.

### Go 모듈을 사용한 프로젝트 구조의 예시와 설명
1. **기본 패키지**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       modname.go
       modname_test.go
     ```
   - **설명**: 간단한 패키지의 경우, 모든 코드는 프로젝트 루트 디렉토리에 위치합니다. 이 구조는 작은 라이브러리나 모듈에 적합합니다.

2. **기본 명령어**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       auth.go
       auth_test.go
       client.go
       main.go
     ```
   - **설명**: 간단한 실행 가능 프로그램은 `main.go` 파일을 중심으로 구성되며, 필요에 따라 추가 파일로 코드를 분리할 수 있습니다.

3. **지원 패키지가 있는 패키지 또는 명령어**:
   - **구조**:
     ```
     project-root-directory/
       internal/
         auth/
           auth.go
           auth_test.go
         hash/
           hash.go
           hash_test.go
       go.mod
       modname.go
       modname_test.go
     ```
   - **설명**: 복잡한 기능은 `internal` 디렉토리에 위치하여 외부 모듈의 접근을 제한함으로써 API 안정성을 보장합니다.

4. **다중 패키지**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       modname.go
       modname_test.go
       auth/
         auth.go
         auth_test.go
         token/
           token.go
           token_test.go
       hash/
         hash.go
       internal/
         trace/
           trace.go
     ```
   - **설명**: 프로젝트가 다양한 기능을 포함하는 경우, 각 기능을 별도의 패키지로 분리하여 관리합니다.

5. **다중 명령어**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       internal/
         ... shared internal packages
       cmd/
         prog1/
           main.go
         prog2/
           main.go
     ```
   - **설명**: 여러 실행 가능 프로그램을 포함하는 프로젝트는 `cmd` 디렉토리를 통해 각 프로그램을 독립적으로 구성합니다.

6. **패키지와 명령어가 동시에 있는 저장소**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       modname.go
       modname_test.go
       auth/
         auth.go
         auth_test.go
       internal/
         ... internal packages
       cmd/
         prog1/
           main.go
         prog2/
           main.go
     ```
   - **설명**: 패키지와 실행 가능 프로그램을 동시에 제공하는 저장소에서는 `cmd` 디렉토리를 사용해 프로그램을 구분하고 관리합니다.

7. **서버 프로젝트**:
   - **구조**:
     ```
     project-root-directory/
       go.mod
       internal/
         auth/
           ...
         metrics/
           ...
         model/
           ...
       cmd/
         api-server/
           main.go
        
        metrics-analyzer/
                main.go
     ```
   - **설명**: 서버 프로젝트는 내부 로직을 `internal` 디렉토리에 보관하고, 서버 구성을 위한 명령어들은 `cmd` 디렉토리 내에 위치합니다.

이러한 구조들은 프로젝트의 유연성을 높이고, 의존성 관리를 명확하게 하며, 코드의 조직화를 향상시키는 데 기여합니다. Go 모듈을 활용한 이러한 접근 방식은 현대적인 Go 개발 환경에서 널리 권장되고 있습니다.

이 명령어는 `go.mod` 파일을 생성하여 프로젝트의 의존성을 관리합니다. 의존성을 추가할 때는 `go get` 명령어를 사용합니다.

```shell
go get -u github.com/some/package
```

#### Hello World 예제
Golang 환경이 제대로 설정되었는지 확인하기 위해 간단한 Hello World 프로그램을 작성해봅시다.

1. `hello`라는 새 디렉토리를 만듭니다.

```shell
mkdir hello
cd hello
```

2. `hello.go` 파일을 생성하고 다음 코드를 작성합니다.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

3. 프로그램을 빌드하고 실행합니다.

```shell
go build hello.go
./hello
```

또는, `go run` 명령어를 사용하여 바로 실행할 수도 있습니다.

```shell
go run hello.go
```



#### VSCode에서 Golang 사용법

Visual Studio Code (VSCode)는 Golang 개발에 매우 유용한 도구입니다. 다음은 VSCode에서 Golang을 설정하고 사용하는 방법입니다.

##### VSCode 설치 및 설정
1. [VSCode 다운로드 페이지](https://code.visualstudio.com/)에 접속하여 VSCode를 다운로드하고 설치합니다.
2. VSCode를 실행하고, 왼쪽 사이드바에서 Extensions 뷰를 엽니다 (또는 `Ctrl+Shift+X` 단축키를 사용합니다).
3. `Go` 확장을 검색하고 설치합니다. 이 확장은 Golang 개발을 위한 다양한 기능을 제공합니다.

##### VSCode에서 Golang 프로젝트 설정
1. VSCode에서 새 프로젝트 디렉토리를 엽니다 (`File` > `Open Folder`).
2. `main.go` 파일을 생성하고 다음 코드를 작성합니다.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, VSCode!")
}
```

3. 터미널을 열고 (`View` > `Terminal` 또는 `Ctrl+``) 다음 명령어를 실행하여 코드를 빌드하고 실행합니다.

```shell
go run main.go
```

##### VSCode에서 Go 확장의 주요 기능
- **자동 완성**: 코드를 작성할 때 자동 완성 기능을 제공합니다.
- **Linting**: 코드 스타일과 관련된 문제를 자동으로 감지하고 표시합니다.
- **디버깅**: Go 코드를 디버깅할 수 있습니다.
- **코드 포맷팅**: `gofmt`를 사용하여 코드를 자동으로 포맷팅합니다.
- **테스트 실행**: Go 테스트 코드를 실행하고 결과를 확인할 수 있습니다.

##### 설정 파일
VSCode에서 Go 개발 환경을 최적화하기 위해 설정 파일(`settings.json`)에 몇 가지 설정을 추가할 수 있습니다. 다음은 추천 설정 예제입니다.

```json
{
    "go.formatTool": "gofmt",
    "go.lintTool": "golint",
    "go.useLanguageServer": true,
    "go.gopath": "/your/gopath",
    "go.goroot": "/usr/local/go",
    "go.toolsGopath": "/your/toolsGopath",
    "go.autocompleteUnimportedPackages": true,
    "go.buildOnSave": "workspace",
    "go.lintOnSave": "workspace",
    "go.vetOnSave": "workspace"
}
```

