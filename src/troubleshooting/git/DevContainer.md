# 컨테이너 내부에서 Git "dubious ownership" 오류 해결하기

컨테이너 환경에서 개발을 하다 보면 종종 예상치 못한 오류에 직면하게 됩니다. 그 중 하나가 `fatal: detected dubious ownership in repository` 오류입니다. 이 글에서는 이 오류가 발생하는 이유와 이를 해결하는 방법을 단계별로 설명하겠습니다.

## 문제 설명

프로젝트를 컨테이너 내부에서 실행할 때, 다음과 같은 Git 오류 메시지를 접할 수 있습니다:

```sh
fatal: detected dubious ownership in repository at '/workspace'
To add an exception for this directory, call:

    git config --global --add safe.directory /workspace
```

이 오류는 주로 컨테이너 내부의 파일 시스템 소유권 문제로 인해 발생합니다. 컨테이너 환경에서는 호스트 시스템과 컨테이너 간의 파일 소유권이 일치하지 않는 경우가 많아 이런 문제가 발생할 수 있습니다.

## 문제 해결 과정

이 문제를 해결하기 위해 우리는 Dockerfile과 `.devcontainer.json` 파일을 수정하여 Git이 `/workspace` 디렉토리를 신뢰할 수 있도록 설정해야 합니다.

### 1. Dockerfile 수정

먼저, Dockerfile을 수정하여 `vscode` 사용자가 `/workspace` 디렉토리에 대한 소유권을 가지도록 설정합니다. 또한, Git이 이 디렉토리를 신뢰할 수 있도록 설정을 추가합니다.

#### 수정된 Dockerfile

```dockerfile
# Golang 1.21.10 이미지를 기반으로 합니다.
FROM golang:1.21.10

# 작업 디렉토리 설정
WORKDIR /workspace

# 필요한 도구 설치
RUN apt-get update && apt-get install -y \
    git \
    curl \
    bash \
    && rm -rf /var/lib/apt/lists/*

# golangci-lint 설치
RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b /usr/local/go/bin v1.50.0

# 환경 변수 설정
ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

# vscode 사용자를 생성
RUN groupadd -g 1000 vscode \
    && useradd -u 1000 -g vscode -m vscode \
    && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 작업 디렉토리 소유권 변경
RUN chown -R vscode:vscode /workspace

# git safe directory 설정
RUN git config --global --add safe.directory /workspace

# 사용자의 권한 설정
USER vscode

# 기본 명령 설정
CMD [ "sleep", "infinity" ]
```

이 Dockerfile은 `vscode` 사용자가 `/workspace` 디렉토리에 대한 소유권을 가지며, Git이 이 디렉토리를 신뢰할 수 있도록 설정합니다.

### 2. .devcontainer.json 수정

다음으로, `.devcontainer.json` 파일을 수정하여 컨테이너가 시작될 때마다 Git 설정이 적용되도록 합니다.

#### 수정된 .devcontainer.json

```json
{
    "name": "Golang Dev Container",
    "build": {
        "dockerfile": "Dockerfile"
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "golang.go",
                "mhutchie.git-graph",
                "eamodio.gitlens",
                "esbenp.prettier-vscode",
                "ms-azuretools.vscode-docker",
                "shardulm94.trailing-spaces",
                "ybaumes.highlight-trailing-white-spaces",
                "github.vscode-pull-request-github"
            ],
            "settings": {
                "terminal.integrated.defaultProfile.linux": "bash",
                "terminal.integrated.profiles.linux": {
                    "bash": {
                        "path": "/usr/bin/bash"
                    }
                },
                "go.toolsManagement.autoUpdate": true,
                "go.lintTool": "golangci-lint",
                "go.lintFlags": [
                    "--fast"
                ],
                "go.formatTool": "goimports",
                "editor.formatOnSave": true,
                "[go]": {
                    "editor.formatOnSave": true,
                    "editor.codeActionsOnSave": {
                        "source.organizeImports": "always",
                        "source.fixAll": "always"
                    }
                },
                "git.safe.directory": "/workspace"
            }
        }
    },
    "postCreateCommand": "(if [ ! -f go.mod ]; then go mod init github.com/username/projectname; fi) && go mod tidy && git config --global --add safe.directory /workspace",
    "remoteUser": "vscode",
    "mounts": [
        "source=${localWorkspaceFolder}/,target=/workspace,type=bind,consistency=cached"
    ],
    "workspaceFolder": "/workspace"
}
```

이 설정을 통해 컨테이너가 시작될 때마다 Git 설정이 적용되어 더 이상 `dubious ownership` 오류가 발생하지 않도록 합니다.

## 결론

이제 컨테이너가 재시작되더라도 Git 오류가 발생하지 않으며, 원활하게 개발 작업을 진행할 수 있습니다. 이 과정에서 Dockerfile과 `.devcontainer.json` 파일을 수정하여 컨테이너 환경을 최적화하였습니다. 이러한 설정은 컨테이너 환경에서 발생하는 파일 소유권 문제를 해결하는 데 매우 유용합니다.