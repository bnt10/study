# Windows에서 VSCode를 이용한 Python 개발 환경 설정

이 가이드는 Windows에서 Visual Studio Code (VSCode)를 사용하여 `venv`를 통해 Python 개발 환경을 설정하는 단계를 안내합니다.

## 1. Python 설치

1. [공식 웹사이트](https://www.python.org/downloads/)에서 최신 버전의 Python을 다운로드합니다.
2. 설치 프로그램을 실행하고 "Add Python to PATH" 상자를 체크합니다.
3. 설치 과정을 완료합니다.

## 2. Visual Studio Code (VSCode) 설치

1. [공식 웹사이트](https://code.visualstudio.com/)에서 VSCode를 다운로드하고 설치합니다.
2. 설치가 완료되면 VSCode를 실행합니다.

## 3. VSCode에 Python 확장 설치

1. VSCode를 엽니다.
2. 사이드바의 확장 아이콘을 클릭하여 확장 뷰로 이동합니다.
3. "Python"을 검색하고 Microsoft에서 제공하는 확장을 설치합니다.
4. 다음 이미지와 같이 Microsoft의 Python 확장을 선택합니다.

   ![![VSCode Python 확장 설치](attachment:image.png) 1](../../../images/f9770e938461a7209af85a2530b2de3b1fa33e808a40ab27f58fb454f0ffb323.png)

## 4. 프로젝트 디렉토리 생성

1. VSCode에서 `Terminal > New Terminal`을 선택하여 터미널을 엽니다.
2. 프로젝트 디렉토리를 생성할 위치로 이동한 후 새로운 디렉토리를 생성합니다:
   ```sh
   mkdir my_python_project
   cd my_python_project
   ```

## 5. 가상 환경 설정

1. 터미널에서 `venv`를 사용하여 가상 환경을 만듭니다:
   ```sh
   python -m venv venv
   ```
2. 가상 환경을 활성화합니다:
   ```sh
   .\venv\Scripts\activate
   ```
   터미널 프롬프트에 `(venv)`가 나타나면 가상 환경이 활성화된 것입니다.

## 6. VSCode에서 가상 환경 사용 설정

1. `Ctrl+Shift+P`를 눌러 명령 팔레트를 엽니다.
2. `Python: Select Interpreter`를 입력하고 선택합니다.
3. 가상 환경을 가리키는 인터프리터를 선택합니다 (예: `.\venv\Scripts\python.exe`).

## 7. Python 스크립트 작성 및 실행

1. VSCode에서 프로젝트 디렉토리에 새 Python 파일을 만듭니다, 예: `app.py`.
2. `app.py`에 간단한 Python 스크립트를 작성합니다:
   ```python
   print("Hello, World!")
   ```
3. 편집기에서 마우스 오른쪽 버튼을 클릭하고 `Run Python File in Terminal`을 선택하여 스크립트를 실행합니다.

## 8. 추가 패키지 설치

1. 추가 패키지를 설치하려면 가상 환경이 활성화되어 있는지 확인합니다.
2. `pip`을 사용하여 패키지를 설치합니다, 예:
   ```sh
   pip install requests
   ```

## 9. `.gitignore` 파일 생성

1. 버전 관리를 사용하는 경우 (예: Git), 프로젝트 디렉토리에 `.gitignore` 파일을 만들어 가상 환경 및 기타 불필요한 파일을 제외합니다:
   ```
   venv/
   __pycache__/
   *.pyc
   .vscode/
   ```

## 10. 가상 환경 비활성화

1. 작업이 끝나면 다음 명령어로 가상 환경을 비활성화합니다:
   ```sh
   deactivate
   ```

## 요약

이 단계를 따르면 Windows에서 VSCode를 사용하여 `venv`를 통해 Python 개발 환경을 설정할 수 있습니다. 이 설정은 프로젝트의 종속성을 독립된 환경에서 관리할 수 있게 하여 다른 프로젝트나 전역 Python 설치와의 충돌을 방지합니다.
