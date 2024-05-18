# 파일 업로드 취약점(Injection)


파일 업로드 취약점은 악의점 파일 업로드에 의해 발생하는 취약점 입니다.
예를 들어 사이트의 프로필 이미지 업로드 기능이 있다고 가정해봅시다.  

공격자는 먼저 HTTP 요청을 간단한 결과를 출력하는 웹셀을 하나 작성했습니다.

```
import subprocess
result = subprocess.getstatusoutput("명령어")

```

이 쉘파일을 프로필 업로드 기능을 통해서 서버로 저장합니다.

이쉘이 파일 업로드 프로세스 중간에 URL을 통해서 호출 할 수 있다면
CMD명령어를 통해 서버 내부를 조작할 수 있게 됩니다. 

# 조치방안
몇 가지 조치 방안을 사용해 취약점을 보호 할 수 있습니다. 

1. 먼저 가장 중요한 방안은 업로드된 파일을 코드로 실행할 수 없을을 보장해야 합니다.
업로드 파일 자체를 CDN에서 파일을 호스팅하면 웹셀을 제거한 안전한 스토리지를 제공받을 수 있습니다.

2. 업로르된 파일을 실행 권한을 막거나 업로드 디렉토리르 격리하여 취약점을 통한 위협이 전파되지 않도록 해야 합니다.

3. 파일서버에 백신설치 
