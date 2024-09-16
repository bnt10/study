### Docker 이미지 빌드 및 Docker Hub에 푸시하는 방법

Docker 이미지를 빌드한 후 Docker Hub에 푸시하는 방법을 단계별로 정리하였습니다. 이 가이드는 `{imageName}`라는 이미지를 Docker Hub에 올리는 과정을 다룹니다. Docker Hub 사용자명은 `{userName}`으로 가정하였습니다.

#### 1. Docker Hub 계정 생성

먼저 Docker Hub에서 이미지를 관리하기 위해 계정이 필요합니다. Docker Hub에서 계정을 생성한 후 로그인합니다. [Docker Hub 계정 생성](https://hub.docker.com) 페이지로 이동하여 계정을 만들어 주세요.

#### 2. Docker 이미지 빌드

이미지를 Docker Hub에 푸시하기 전에 로컬에서 이미지를 빌드합니다. 이를 위해 프로젝트 디렉터리에 `Dockerfile`이 있어야 하며, 다음 명령어를 실행합니다.

```bash
docker build -t {imageName}:latest .
```

이 명령어는 현재 디렉터리(`.`)에 있는 `Dockerfile`을 사용해 `{imageName}`라는 이름으로 이미지를 빌드합니다. `:latest`는 이미지의 태그(tag)로, 특별한 경우가 아니라면 `latest`를 기본으로 사용합니다.

#### 3. Docker Hub에 로그인

Docker Hub에 이미지를 푸시하려면 먼저 Docker CLI를 통해 Docker Hub에 로그인해야 합니다. 아래 명령어를 사용하여 로그인합니다.

```bash
docker login
```

명령어를 실행하면 Docker Hub의 사용자명(`{userName}`)과 비밀번호를 입력하라는 메시지가 나타납니다. 로그인 후 이미지를 푸시할 수 있습니다.

#### 4. Docker 이미지에 태그 추가

이미지를 Docker Hub에 푸시하기 위해서는 Docker Hub에서 사용할 이미지 경로로 태그를 추가해야 합니다.

```bash
docker tag {imageName}:latest {userName}/{imageName}:latest
```

이 명령어는 로컬 이미지인 `{imageName}:latest`를 Docker Hub의 `{userName}/{imageName}:latest`로 태그합니다.

#### 5. Docker 이미지 푸시

태그를 추가한 후, 이미지를 Docker Hub에 푸시합니다.

```bash
docker push {userName}/{imageName}:latest
```

이 명령어는 `{userName}` 계정의 `{imageName}` 이미지로 푸시합니다. 푸시가 완료되면 Docker Hub 웹사이트에서 해당 이미지를 확인할 수 있습니다.

#### 6. Docker Hub에서 이미지 확인

Docker Hub에 접속한 후, `Repositories` 탭에서 `{imageName}` 저장소가 생성된 것을 확인할 수 있습니다. 여기에 저장된 이미지를 다른 서버에서 가져다 사용할 수 있으며, 이 이미지를 기반으로 다른 컨테이너를 실행할 수 있습니다.

---

이 과정을 통해 Docker 이미지를 로컬에서 빌드하고 Docker Hub에 푸시할 수 있습니다.
