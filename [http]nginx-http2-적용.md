# NGinx 설치 및 HTTP 2.0 적용 (centos7) 

## 1. yum 외부 저장소 추가 

yum  저장소에는 nginx가 없기 때문에 외부 저장소를 추가 해야 한다.

```
$ cd /etc/yum.repos.d/
$ ls
CentOS-Base.repo  CentOS-CR.repo  CentOS-Debuginfo.repo  CentOS-Media.repo  CentOS-Sources.repo  CentOS-Vault.repo  CentOS-fasttrack.repo  microsoft-prod.repo
```




## 2. /etc/yum.repos.d/ 경로에 nginx.repo 파일을 추가
```
$ vim /etc/yum.repos.d/nginx.repo
```


nginx.repo 파일
```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

위 내용은 공식 사이트에 있으며, 
OS가 다르다면 해당 OS에 맞게 수정해 주면 된다.





### 3. yum install

yum install 명령어를 이용해서 설치한다.

```
$ yum install -y nginx
```




### 4. 방화벽 포트 개방

기존 443 포트에 열려 있다면 

Nginx를 다른 443 포트가 아닌 다른 포트에서 열어야 한다.
```
$ firewall-cmd --permanent --zone=public --add-port=443/tcp
$ firewall-cmd --reload
$ firewall-cmd --list-ports
443/tcp
```





#### 5. SELinux 사용 시 http port 오픈

SELinux 동작 모드는 enforce, permissive, disable 세 가지 모드가 있으며,

RHEL/CentOS 를 설치하면, default로 enforce mode로 동작하고,







SELinux 의 rule 에 어긋나는 operation 은 거부된다.



SELinux 모드 확인
```
$ sestatus
SELinux status: enabled
SELinuxfs mount: /selinux
Current mode: enforcing
Mode from config file: enforcing
Policy version: 24
Policy from config file: targeted
Plain text
```




SELinux가 enforce 모드로 되어 있다면 

아래의 명령어를 입력하여 http port를 열어 주어야 한다. 

http port 오픈 하기 위해 추가해주는 방법
```
$ semanage port -a -t http_port_t -p tcp 443
```

오픈 된 http port 확인 방법
```
$ semanage port -l | grep http_port_t
```



### 6. Self-Signed 키 생성

key 생성 경로는 정해져 있지 않으며, 생성 경로를 Nginx 설정 파일에 입력하면 된다.

예제에서는 키 생성 경로를 /usr/lib/[folder]/key/temp 로 정한다.
- folder 
- fileName 
```
$ cd /usr/lib/[folder]/key/temp
$ openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout [fileName].pem -out [filName].pem -subj "/CN=localhost" -days 365
$ openssl rsa -in [fileName].pem -text > [fileName].key
$ openssl x509 -inform PEM -in [fileName].pem -out [fileName].crt
```






### 7. NGinx 서버 설정
```
$ vim /etc/nginx/conf.d/default.conf
```

default.conf 파일
- folder
- fileName
```
server {
        listen  443 ssl http2 ;
        server_name _;
        #access_log /var/log/nginx/proxy/access.log;
        #error_log /var/log/nginx/proxy/error.log;
        
        
        
        #생성 키 등록!
        ssl_certificate /usr/lib/[folder]/key/temp/[fileName].crt;
        ssl_certificate_key /usr/lib/[folder]/key/temp/[fileName].key;
        
        
        
        
        location / {
               # First attempt to serve request as file, then
               # as directory, then fall back to displaying a 404.
               proxy_pass https://192.168.56.107:5200;
               #proxy_pass https://www.google.com;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```
ssl_certificate와 ssl_certificate_key는 위의 단계에서 생성한 self-signed key의 경로를 입력한다.







### 8. Nginx 데몬 실행
```
$ systemctl start nginx
$ systemctl enable nginx
```
