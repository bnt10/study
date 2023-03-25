# memcahed

memcached는 분산 메모리 캐시 시스템으로, 다양한 언어와 프레임워크에서 지원되는 인기 있는 캐시 솔루션입니다. memcached를 사용하여 OpenStack의 REST API 결과를 캐시하는 것은 좋은 선택일 수 있습니다.

memcached를 사용하여 OpenStack의 REST API 결과를 캐시하는 방법은 다음과 같습니다.
memcached 설치: 먼저, 캐시 서버에 memcached를 설치해야 합니다.
캐시 키 생성: memcached는 캐시된 데이터를 키-값 쌍으로 저장합니다. OpenStack의 REST API 결과를 캐시하려면, 각 REST API 호출에 대한 고유한 키를 생성해야 합니다.

캐시 데이터 저장: REST API 호출에 대한 응답을 받으면, 해당 응답을 memcached에 저장합니다. 이 때, 캐시의 유효기간을 설정할 수 있습니다. 캐시된 데이터가 만료되면, memcached는 해당 데이터를 삭제합니다.
캐시 데이터 검색: 캐시된 데이터를 검색하려면, memcached에 저장된 데이터를 키를 사용하여 가져옵니다.

캐시 데이터 갱신: 캐시된 데이터가 업데이트되면, 새로운 데이터를 memcached에 저장합니다. 이 때, 기존에 캐시된 데이터를 먼저 삭제해야 합니다.
위와 같이 memcached를 사용하여 OpenStack의 REST API 결과를 캐시하면, 클라이언트 측에서 REST API 호출을 줄일 수 있습니다. 또한, memcached는 분산 메모리 캐시 시스템이므로, 여러 대의 서버에서 데이터를 캐시할 수 있습니다. 이를 통해 더 높은 가용성과 확장성을 제공할 수 있습니다.



## docker로 구성

### dockerfile
```yml
FROM python:3.9-slim-buster

# memcached 패키지 설치
RUN apt-get update && apt-get install -y memcached


# pip 업그레이드
RUN pip install --no-cache-dir --upgrade pip

# uwsgi와 빌드에 필요한 패키지 설치
RUN apt-get install -y gcc libc-dev
RUN pip install uwsgi

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 라이브러리 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 복사
COPY app.py .

# uwsgi를 이용하여 Flask 앱 실행
CMD ["uwsgi", "--http", "0.0.0.0:5000", "--module", "app:app", "--master", "--processes", "4", "--threads", "2"]

```

### app.py
```python
from flask import Flask
from pymemcache.client.base import Client

app = Flask(__name__)

#memchaed client 설정
mc = Client(('memcached',11211))

@app.route('/')
def hello():

    value = mc.get('key')
    try:
        if value is None:
            # when not cached Data
            value = 'default value'
            mc.set('key', value)

        return value
    except Exception as e:
        print('error', e)
if __name__ == '__main__':
    app.run()

```

### docker-compose.yml
```yml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "8080:5000"
    environment:
      MEMCACHED_HOST: memcached
    depends_on:
      - memcached
  memcached:
    image: memcached:latest
    command: memcached -m 64

```

### 실행
```
docker-compose up
```

### 수정
```
#app.py 수정후

docker-compose build

docker-compose up
```
