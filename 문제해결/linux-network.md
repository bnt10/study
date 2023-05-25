# linux network 오류 해결

## 문제

network가 아래 문제로 잡히지 않는 경우
```
libdns-export.so.1102 cannot open shared object file
```

## 해결

```
systemctl stop NetworkManager
systemctl disable NetworkManager
systemctl restart NetworkManager
```
