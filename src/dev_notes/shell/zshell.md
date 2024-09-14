# 1. Zsh 설정

## 1.1 Oh My Zsh 설치

**Oh My Zsh**는 Zsh의 기능을 확장하고 관리할 수 있는 편리한 환경을 제공합니다. 아래 명령어로 설치할 수 있습니다:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

설치가 완료되면 Zsh를 다시 시작하거나 다음 명령어로 설정을 적용합니다:

```bash
source ~/.zshrc
```

## 1.2 Git 플러그인 활성화

Oh My Zsh에는 **Git 플러그인**이 포함되어 있으며, 이를 활성화하려면 `.zshrc` 파일을 수정해야 합니다:

```bash
plugins=(git)
```

변경 후에는 설정을 적용합니다:

```bash
source ~/.zshrc
```

## 1.3 `zsh-autosuggestions` 플러그인 설치 및 설정

`zsh-autosuggestions` 플러그인은 히스토리를 기반으로 자동으로 명령어를 제안해주는 플러그인입니다. 아래 명령어로 설치할 수 있습니다:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

설치 후 `.zshrc` 파일의 플러그인 목록을 수정합니다:

```bash
plugins=(git zsh-autosuggestions)
```

변경된 설정을 적용하려면 다음 명령어를 실행하세요:

```bash
source ~/.zshrc
```

## 1.4 `zsh-syntax-highlighting` 플러그인 설치 및 설정

`zsh-syntax-highlighting`는 명령어 구문을 강조하여 유효한 명령어는 초록색, 잘못된 명령어는 빨간색으로 표시해주는 플러그인입니다. 설치는 다음 명령어를 통해 진행됩니다:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

설치 후 `.zshrc` 파일의 플러그인 목록에 추가합니다:

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

이 플러그인은 반드시 플러그인 목록의 **마지막에 추가**해야 합니다. 설정을 적용하려면 다음 명령어를 실행하세요:

```bash
source ~/.zshrc
```
