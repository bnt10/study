# 선택자 우선순위란

여러 선언이 (id, class...)등이 하나의 요소에 대해 선택 했을 경우  
각 선언에 대한 우선권 입니다.


## 우선 판단 기준
1. 점수가 높은 선언이 우선함
3. 점수가 같으면, 마지막 해석 기준으로 우선함

## 우선순위

1. !important **다른 스타일 무시**

```css
p {
  font-size: 16px !important;
}
```
2. html 문서 내부 inline style  (1000점)

```javascript
<div>
  <p style="font-size:12px;">Content</p>
</div>

```
3. id (100점)
```javascript
<div>
  <p id="userId">Content</p>
</div>

#userId {
  font-size: 14px;
}
```

4. class (10점)
```javascript
<div>
  <p class="users">Content</p>
</div>

.users {
  font-size: 14px;
}
```

5. tag 선택자 (1점)
```javascript
<div>
  <p >Content</p>
</div>

p {
  font-size: 14px;
}
```

6. *(전체 선택자) (0점)
```javascript
* {
   font-size: 12px;
}
```

7. :not(부정선택자) (0점)
```javascript
:not(p) {
   font-size: 12px;
}
```



 

