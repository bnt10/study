# Cypress란
오픈소스 front end testing 도구입니다. 
Cypress는 브라우저를 다룰 수 있는 별도의 드라이버를 만들어서 사용하고, 여러 종류의 테스트에 대해서 대응 할 수 있습니다.
Cypress에서는 GUI 도구를 지원하고, 스펙관리 및 디버깅 설정도 가능합니다.

지원가능 테스트 종류
- End-to-end 테스트
- Component 테스트
- Intergration 테스트
- Unit 테스트

# Install

```
cd /your/project/path #설치 경로 선택
npm install --save-dev cypress #설치
```

# Open Cypress
이제 설치가 완료되었다면 Cypress를 실행해 봅시다.
```
npx cypress open 
```

<img width="869" alt="image" src="https://user-images.githubusercontent.com/43377349/215242127-c325d39b-9f34-4924-9529-bee67f58dcb5.png">


E2E Testing 선택해 줍시다.  

<img width="869" alt="image" src="https://user-images.githubusercontent.com/43377349/215242184-6f9e8547-6ac1-4366-bed3-318c86e07b73.png">

cypress 에서 사용할 기본적인 config 입니다. 모두 생성해줍니다.  

<img width="863" alt="image" src="https://user-images.githubusercontent.com/43377349/215242407-d5066967-c8e3-435a-afd3-6820cdeaeb39.png">

테스트에 사용할 browser를 선택합니다.

<img width="863" alt="image" src="https://user-images.githubusercontent.com/43377349/215242452-f7e4707e-1ead-439e-94d1-267aa6ed6a8d.png">


# E2E 테스트 

비어있는 spec 파일을 생성 합니다.


<img width="865" alt="image" src="https://user-images.githubusercontent.com/43377349/215242536-26bee91f-4dbf-45a1-af13-760784c20c23.png">

<img width="730" alt="image" src="https://user-images.githubusercontent.com/43377349/215242620-67c17f16-9541-42ac-92bb-9066acea7818.png">

<img width="637" alt="image" src="https://user-images.githubusercontent.com/43377349/215242630-fd2bbb59-f948-4202-89fa-b431eed844a7.png">

<img width="792" alt="image" src="https://user-images.githubusercontent.com/43377349/215242677-920ef7f0-256b-4c89-9532-1e6db4272497.png">


생성한 spec 파일의 내용을 수정해 봅시다.

```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```

변경이 적용되어 첫 테스트는 통과하게 됩니다.

<img width="850" alt="image" src="https://user-images.githubusercontent.com/43377349/215242722-e5b17e8b-3427-43c6-828a-5bd24a16a6c4.png">


만약 의도적으로 실패하는 코드를 작성하면 어떻게 될까요?
```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})
```

<img width="856" alt="image" src="https://user-images.githubusercontent.com/43377349/215242765-4f1ec2f8-f9c1-4988-8b11-6cb1544036ae.png">


첫 테스트에 대한 정리는 이만 마치겠습니다.
다음에는 테스트 사이트를 통해 E2E테스트를 진행해 보겠습니다.
