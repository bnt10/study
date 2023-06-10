# 문제
proxy server를 통해 외부망에 접근해야 하는 문제로 인하여 yum install을 사용하지 못함

# 해결
1. Yum 프록시 설정 파일 편집:

```
sudo vi /etc/yum.conf
```

2. proxy 설정 추가:
yum.conf 파일에서 [main] 섹션을 찾고, 다음과 같이 proxy 설정을 추가합니다:

```
proxy=http://[ip]:[port]
```
