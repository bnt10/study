Mac에서 **`kubectl`**과 \* 설정하는 안내하는 가이드입니다.

---

### 1. `kubectl` 설정

#### 1.1 `kubectl` 설치

Mac에서 `kubectl`을 설치하려면 **Homebrew**를 사용하면 간편합니다. 다음 명령어로 설치를 진행할 수 있습니다:

```bash
brew install kubectl
```

설치가 완료되면, 아래 명령어로 정상적으로 설치되었는지 확인하세요:

```bash
kubectl version --client
```

#### 1.2 `kubectl` 자동완성 설정

`kubectl` 명령어는 길기 때문에 자동완성 기능을 설정하면 매우 유용합니다. **Zsh** 환경에서 자동완성을 설정하는 방법은 아래와 같습니다:

1. 자동완성 스크립트를 `.zshrc` 파일에 추가합니다:

   ```bash
   echo 'source <(kubectl completion zsh)' >> ~/.zshrc
   ```

2. `kubectl`을 `k`로 줄여 사용할 수 있도록 alias를 설정합니다:

   ```bash
   echo 'alias k=kubectl' >> ~/.zshrc
   ```

3. alias에서도 자동완성이 가능하도록 설정을 추가합니다:

   ```bash
   echo 'complete -F __start_kubectl k' >> ~/.zshrc
   ```

4. 설정을 적용하려면 다음 명령어를 실행하세요:

   ```bash
   source ~/.zshrc
   ```

이제 `kubectl`을 `k`로 줄여 사용할 수 있으며, 자동완성 기능도 활성화됩니다.
