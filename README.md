# 개요

## 1. 프로젝트 개요

- 4H(청소년 사회교육단체)에서 활동 중인 의뢰인이 지구 온도 낮추기 프로젝트를 진행할 예정이었고, 이 프로젝트의 성과를 효과적으로 보여줄 수 있는 웹사이트 제작을 부탁받아 제작하게 되었습니다.

## 2. 프로젝트 정보

- 제목 : 지구온화나
- 기술스택 : three.js, npm
- 기기지원 : 데스크탑, 태블릿, 모바일

## **3. 의뢰인의 요구사항**

1. 프로젝트 진행에 따라 변화하는 지구의 모습을 시각적으로 표현 할 것
2. 지구 온도의 변화를 직관적으로 알수 있도록 숫자로 표시 할 것
3. 진행된 프로젝트 내용을 사용자가 볼 수 있도록 할 것

## **4. 구현 내용**

1. 3D 지구 구현 ****: 향상된 사용자 경험을 위해 three.js를 사용하여 3D 지구를 구현하고, 3D 오브젝트의 텍스처를 변화시켜 지구의 모습이 변하는 기능을 구현하였습니다.
2. 온도계 UI ****: 지구의 온도를 숫자로 보여주기 위해 온도계 UI를 구현했습니다.
3. 팝업 알람 ****: 프로젝트 내용을 팝업 알람 형태로 구현하여 사용자가 프로젝트 진행 시점을 알 수 있도록 했습니다.
4. 날짜 UI ****: 사용자가 프로젝트 진행 날짜를 알 수 있도록  날짜기능을 제작하여 의뢰인에게 보여주었고, 의뢰인이 만족하여 실제 웹 사이트에 적용하였습니다.
5. 콘텐츠 관리 : 관리자가 손쉽게 콘텐츠 추가 및 관리를 쉽게 할 수 있도록 콘텐츠 관리 전용 파일을 따로 만들어 분리하였습니다.

# 사용기술

## 1. Three.js

### 1.1 Three.js 설치

- Three.js를 사용하기 위해서는 npm을 통한 설치와 cdn을 사용할 수 있다.
- 이 프로젝트에서는 공식 홈페이지에서는 npm을 통해 설치하는 것을 추천해여 npm을 사용하였다.Support: Desktop
- 설치 자체는 간단하지만 번들러를 사용하지 않았기 때문에 모듈들의 경로를 일일이 수정해주었다.
- npm이란 노드 패키지 매니저로 node.js로 만들어진 모듈을 설치 및 관리 할 수 있게 해주는 프로그램이다. 기본적으로 node.js를 설치하게되면 같이 설치된다.
- npm을 통해 필요한 모듈을 설치하려면 cmd(명령프롬프트)에서 아래와 같이 입력하면 된다.
1. cd “c:\모듈 설치 폴더경로”
2. npm -v
3. npm init
4. npm i ”모듈이름”

---

### 1.2 테스트 메뉴 제작

- 웹사이트에서 qwerty를 순서대로 입력하면 이것저것 테스트 해볼 수 있는 메뉴를 만들었다.
- 사용자가 키보드를 입력하게되면 입력한 키보드 값들을 순차적으로 배열에 저장하여 정해진 명령어와 일치하게 되면 스크립트가 작동되도록 설계하였다.
- 추가적으로 배열에 문자가 6개 이상 저장이 될 시 앞서 들어있던 배열이 삭제되도록 하여 처음에 다른 키를 입력하더라도 qwerty를 순서대로 입력할 시 스크립트가 작동되도록 했다.

![1](https://github.com/user-attachments/assets/588b646a-1169-43a4-8f19-dd06d2c326d8)


- 사용코드

```jsx
let keyArry = [];

(function(){
    document.addEventListener('keydown', function(e){
        const keyCode = e.keyCode;
        keyArry[keyArry.length] = e.key //키보드 입력값을 변수에 저장
        // console.log('pushed key ' + e.key)
        console.log(keyArry.join(""))
        if(keyCode == 13){ // Enter key
        document.dispatchEvent(new KeyboardEvent('keydown', {key: 'e'}));
        } else if(keyCode == 9){ // Tab key
        document.dispatchEvent(new KeyboardEvent('keydown', {key: 't'}));
        }

        if(keyArry.join("") == "qwerty"){
            alert("테스트메뉴 기동")
            $(".sc-debug").addClass('on')
        }
        
        
        if(keyArry.length == 6){
            keyArry.shift();
        }
    })
})();

```

---

### 1.3 지구본 제작

- 3D 지구본의 자전, 자전축, 태양광, 입체그림자, 입체감, 구름, 야간조명 을 구현하여 디테일을 추가했다.

### 1.3.1 자전축

- 자전축 회전과 자전 애니메이션의 회전 기능이 겹치지 않게 하기 위해 `.Group()`  기능을 사용하여 자전축 회전을 `.Group()`에 적용하였고 회전 애니메이션은 오브젝트에 직접 적용하였다.
- 자전축 회전을 위해  `degree * Math.PI / 180` 라는 로직을 사용하였는데 `Math.PI / 180` 를 하는 이유가 궁금해서 찾아본 결과 Three.js 에서는 회전에 각도법이 아닌 호도법을 사용한다는 것을 알아냈다.

### 1.3.2 map

- 지구본 텍스쳐의 디테일을 살리기 위해 노말맵, 범프맵, 디스플레이스먼트 맵을 적용하였다.
- 각 맵들의 차이점은 노말맵과 범프맵은 매쉬에 변형을 가하지 않고 높이에 따른 그림자를 구현하고 디스플레이스먼트맵은 실제로 매쉬의 형태를 변형시킨다.

![2](https://github.com/user-attachments/assets/63bbbb7d-2d67-441a-b1a6-d72efa91d7b0)



종류별 텍스쳐 적용 모습 예시

- 디스플레이스먼트맵의 경우 텍스쳐에 적용은 되어있지만 보이지 않도록 했습니다. 왜냐하면 구체의 면이 많을수록 입체가 디테일해지고 면이 적을수록 디테일이 떨어지게 되는데 면의 개수를 무작정 늘리게 될 시 저사양 데스크톱에서 로딩이 느리게 되거나 렉이 걸릴 가능성을 고려하였습니다.

<figure>
  <img src="https://github.com/user-attachments/assets/2a6b4d15-4e8f-41f2-8487-bc3b3f3581be" alt="Example Image">
  <figcaption>폴리곤이 1,440개일 때 디스플레이스먼트 텍스쳐 적용(빨간 부분이 입체적으로 나와있다)</figcaption>
</figure>
<figure>
  <img src="https://github.com/user-attachments/assets/3a572462-6380-4f34-982e-37bca289a05f" alt="Example Image">
  <figcaption>폴리곤이 144개일 때 디스플레이스먼트 텍스쳐 적용(폴리곤의 수가 낮아 입체표현이 뾰족하게 표현된다)</figcaption>
</figure>




### 1.3.3 블렌딩

- 구름과 야간조명을 구현하기 위해 구름과 야간조명 머테리얼을 추가로 만들어 지구본에 합쳐주었다.
- 그대로 적용할 경우 기존 지구본 위에 덮어씌워지는 형태가 되므로 AdditiveBlending을 이용하여 지구본과 섞일 수 있도록 하였다.
- AdditiveBlending뿐만 아니라 다른 블렌딩 모드도 존재하며 [링크](https://threejs.org/docs/#api/en/constants/Materials)로 들어가서 확인 가능하다.
- 사용코드

```jsx
const lightMaterial = new THREE.MeshBasicMaterial({
    blending: THREE.AdditiveBlending,
})
```

---

### 1.4 지구본 애니메이션

- 사막화된 지구가 풀숲으로 녹화되어가는 모습을 구현하였다.
- 녹화 전용의 머테리얼을 구성하여 opacity를 0으로 맞추고 전체 애니메이션이 진행됨에 따라 opacity값을 올리는 방식으로 구현하였다.

![5](https://github.com/user-attachments/assets/daaf2a68-3d4a-42e2-9cb5-ebdd95ae0bae)


---

### 1.5 글로우 효과 (도넛방향)

- 지구본의 가장자리에 옅게 빛나는 글로우 효과를 적용하였다.
- 해당 방식을 구현할 수 있는 npm  모듈을 찾았지만 버전이 오래되어 현재 적용되지 않는 문제가 생겼다. 그 외에도 다른 방법을 찾아봤지만 잘 되지 않아 기능을 직접 구현하기로 했다.
- 지구본의 테두리에 걸치도록 얇은 토러스(도넛모양) 오브젝트를 생성하여 글로우 효과를 줄 색상을 적용하였다.
- 이것만으로는 테두리가 빛나지 않기 때문에 후처리 기능 중 하나인 블룸을 추가적으로 적용하였다. 블룸을 사용하기 위해 Three.js의 에드온인 RenderPass, EffectComposer, UnrealBloomPass, OutputPass를 사용했다.
- 사용코드

```
import {RenderPass} from './node_modules/three/examples/jsm/postprocessing/RenderPass.js'
import {EffectComposer} from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js'
import {UnrealBloomPass} from './node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js'
import {OutputPass} from './node_modules/three/examples/jsm/postprocessing/OutputPass.js'

const renderScene = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer);
composer.addPass(renderScene)

const bloomComposer = new EffectComposer(renderer);
bloomComposer.addPass(renderScene);

const outputPass = new OutputPass();
bloomComposer.addPass(outputPass);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), //해상도
    1.0,  //효과의 강도
    1.2,  //블룸의 범위
    0.1,  //??? b
);

composer.addPass(bloomPass)
    
bloomComposer.renderToScreen = false;

function animate(){
    requestAnimationFrame(animate);
    composer.render();
}
animate();

```

- 토러스가 항상 카메라 방향을 향하게 하여 어느 각도로 카메라를 돌려도 동일한 모습으로 보이도록 하였다.
![6](https://github.com/user-attachments/assets/4a8ab259-9b39-4f75-b451-fc7db315d414)

    
- 사용코드

```
function  donutCamera(){ // 도나쓰 카메라 방향으로 전환
    let camPos = camera.position
    donutMesh.lookAt(camPos.x,camPos.y,camPos.z)
}
scene.add(donutMesh)
function animate(){
    donutCamera()//도나쓰 오브젝트의 방향
		requestAnimationFrame(animate);
    composer.render();
}
animate();

```

---

### 1.6 카메라 컨트롤

- 카메라를 회전하여 둘러볼 수 있도록 하기 위해 three.js 의 에드온인 OrbitControls을 사용하였다. 추가적으로 카메라 이동과 줌인 줌아웃을 비활성화하여 오브젝트들이 뒤틀려 보이는 것을 방지하였다.
- 사용코드

```jsx
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = zoomCheck;
controls.update();
```

---

### 1.7 우주 배경화면

- 카메라를 회전하여 둘러볼때 배경화면도 같이 움직일 수 있도록 만들었다.
- 초기에는 매핑기능을 이용하여 이미지를 360도 파노라마 형식으로 적용하는 방식을 사용하였다.
- 사용 모습에 대해서는 [3d배경 테스트 링크](https://www.flickr.com/photos/jonragnarsson/2294472375/in/photostream/) 에서 확인 가능하다.
- 위와같은 방식을 사용할시 배경이미지가 평면적으로 느껴지는 단점이 있어 starField.js라는 다른 개발자가 만든 파일을 수정하여 사용하였다.
    
![7](https://github.com/user-attachments/assets/1d71f71e-f0d0-4fd7-87ba-434e4f554572)


---

### 1.8 물빠진 색감 문제

- 텍스쳐 로더를 통해불러온 이미지를 오브젝트에 그대로 적용할 때 아래와 같이 원본 이미지보다 색감이 뿌옇게 나오는 문제가 생겼다.
    
![8](https://github.com/user-attachments/assets/7fa96a8f-fa83-4bfd-9256-5a45c0d239e6)

    
- 해당 문제에 대해 조사를 해본 결과 이미지 출력방식을 대부분의 모니터에서 사용하는 srgb방식이 아닌 hdr방식으로 출력을 해서 생긴 문제였다.
- `textureName.colorSpace = THREE.SRGBColorSpace` 이 코드 한줄을 사용하여 간단하게 문제를 해결할 수 있었지만 이렇게 사용할 경우 텍스쳐를 추가할때마다 계속 같은 코드를 추가해 줘야 하기 때문에 텍스쳐들을 배열에 저장하여 한번에 적용할 수 있는 코드를 만들었다.
- 사용코드

```jsx
// 텍스쳐 변수 배열 선언
let textureArry = [
    earthMap,
    bumpMap,
    normalMap,
    displacementMap,
    cloudMap,
    LightEarthMap,
    textureGrass,
    spaceBackground,
]

// 텍스쳐 SRGBColorSpace 자동 적용
let i = 0;
for(i = 0; i < textureArry.length; i++){
    textureArry[i].colorSpace = THREE.SRGBColorSpace;
}
```

---

## 2 애니메이션 스크립트

### 2.1 애니메이션 제어

- 각각의 개별적으로 동작하는 애니메이션들을 1에서 n까지 숫자가 증가하는 하나의 스크립트로 묶어 애니메이션 스크립트를 한번에 관리할 수 있도록 만들었다.
- 재생 프로그레스바. 온도계, 지구 녹화, 지구 글로우 색상효과, 날짜 증가의 다섯가지 애니메이션들을 하나로 묶었다.
- 또한 if문과 `clearInterval()` 을 사용하여 정지, 재시작 기능도 원활하게 사용 가능하다.
- 사용코드

```
let loopAnimeFlag = 0;
function loopAnimation(){
    if(play >= pauseTime){ //재생중지하기
        clearInterval(interval);
        play = 'pause';
        // console.log(play);
        $(".sc-play .play-btn").toggleClass('on');
    }else if(play == 'pause'){ //재생 재시작하기
        // console.log('다시재생하기');
        play = 0;
        sequence = 0;
        loopAnimeFlag = 0
    }else if(sequence == notifTriggerNum[loopAnimeFlag]){ //알림 재생 타이밍
        tempFnc()
    }else{ //애니메이션 재생
        play = play+1;
        sequence = sequence+1;
        // 온도계 설정
        let incTemp = sequence*(tempNow-tempCon)/pauseTime
        // console.log(incTemp)
        let temp = 100-tempNow+incTemp;
        $(".sc-temperature .value").text((tempNow-incTemp).toFixed(1))
        $(".sc-temperature .temperature").css('clip-path','polygon(0 '+temp+'%, 100% '+temp+'%, 100% 95%, 0% 95%)');
        //지구본 녹화 값
        red = donutRed - sequence * donutRed / pauseTime;
        green = donutGreen - sequence * donutGreen / pauseTime;
        blue = sequence * donutBlue / pauseTime;
        donutMaterial.color.setRGB(red,green,blue)
        greenMaterial.opacity = sequence * (earthOpacityCon-0.5) / pauseTime;
        // 프로젝트 날짜
        let incress = Math.floor(play*diffDate/pauseTime)*1000*60*60*24;
        let incNum = new Date(originDate+incress)
        let incYear = incNum.getFullYear();
        let incMonth = incNum.getMonth()+1;
        let incDate = incNum.getDate();
        let incDay = incNum.getDay();
        $(".sc-date .year").text(incYear)
        $(".sc-date .date").text(incMonth+"."+incDate)
        $(".sc-date .day").text(korDate[incDay])
        // 프로그레스바
        $(".sc-progress-bar .bar").css("width", sequence*100/pauseTime+"%")
    }
}

let interval = setInterval(loopAnimation,300); 
clearInterval(interval);

```

---

### 2.2 애니메이션 목표값 자동변환

- 전체 숫자증가 스크립트에서 값을 받아와 각 개별 애니메이션이 작동하기 때문에 전체 숫자를 개별 애니메이션 에서 사용할 수 있는 숫자로 변환할 수 있는 스크립트를 만들었다.
- `1~N증가 변수 * 애니메이션 목표 숫자 / N` 이 로직을 이용하여 원하는 값들을 쉽게 변환 할 수 있었다.
- 사용코드

```jsx
 else{ //애니메이션 재생
        play = play+1;
        sequence = sequence+1;
        // 온도계 설정
        let incTemp = sequence*(tempNow-tempCon)/pauseTime
        let temp = 100-tempNow+incTemp;
        $(".sc-temperature .value").text((tempNow-incTemp).toFixed(1))
        $(".sc-temperature .temperature").css('clip-path','polygon(0 '+temp+'%, 100% '+temp+'%, 100% 95%, 0% 95%)');
        //지구본 녹화 값
        red = donutRed - sequence * donutRed / pauseTime;
        green = donutGreen - sequence * donutGreen / pauseTime;
        blue = sequence * donutBlue / pauseTime;
        donutMaterial.color.setRGB(red,green,blue)
        greenMaterial.opacity = sequence * (earthOpacityCon-0.5) / pauseTime;
        // 프로젝트 날짜
        let incress = Math.floor(play*diffDate/pauseTime)*1000*60*60*24;
        let incNum = new Date(originDate+incress)
        let incYear = incNum.getFullYear();
        let incMonth = incNum.getMonth()+1;
        let incDate = incNum.getDate();
        let incDay = incNum.getDay();
        $(".sc-date .year").text(incYear)
        $(".sc-date .date").text(incMonth+"."+incDate)
        $(".sc-date .day").text(korDate[incDay])
        // 프로그레스바
        $(".sc-progress-bar .bar").css("width", sequence*100/pauseTime+"%")
    }
```

---

### 2.3 날짜증가 애니메이션

- 프로젝트 시작 날짜부터 오늘 날짜까지 날짜가 증가하도록 만들었다.
- 오늘날짜와 프로젝트 시작 날짜의 차이를 계산하기 위해 두 값을  `.getTime()` 을 이용하여 밀리세컨드로 변환시킨후 `밀리세컨드차이값 / 1000*60*60*24` 를 적용시켜 두 날짜의 차이를 구할 수 있었다.
- 목표값 자동변환 로직을 이용하여 1에서 날짜차이 만큼 숫자가 증가하게 한 후 `1000*60*60*24` 를 곱하여 밀리세컨드 값으로 변환시켜주었다.
- 시작 날짜의 밀리세컨드값에 날짜 증가 밀리세컨드값을 더해 날짜값의 증가를 밀리세컨드 단위로 맞추고 `.getFullYear()` `.getMonth()` `.getDate()` `.getDay` 를 이용하여 증가하는 년도, 월, 일, 요일 값들이 증가하게 만들었다.
- 요일의 경우 한국어를 사용하기 위해 요일명이 적힌 배열을 만들어 불러오는 방식을 사용하였다.
    
![9](https://github.com/user-attachments/assets/7f1b950b-75d9-4059-988a-5e4e71e0beb0)

    
- 사용코드

```
let korDate = ["일","월","화","수","목","금","토"]
let incress = Math.floor(play*diffDate/pauseTime)*1000*60*60*24;//날짜차이 숫자 증가의 밀리세컨드값
let incNum = new Date(originDate+incress) //시작일로부터 증가하는 날짜
let incYear = incNum.getFullYear();
let incMonth = incNum.getMonth()+1;
let incDate = incNum.getDate();
let incDay = incNum.getDay();
$(".sc-date .year").text(incYear)
$(".sc-date .date").text(incMonth+"."+incDate)
$(".sc-date .day").text(korDate[incDay])

```

---

### 2.4 알람 재생 및 중단하기

- 애니메이션이 재생되면서 특정 날짜가 될 시 단체에서 진행한 친환경 프로젝트 내용을 표시할 수 있는 알람을 만들었다.
- `append()` 를 이용하여 알람을 추가하는 방식으로 구성했다. 알람으로 쓰이는 메세지와 알람이 시작하는 타이밍은 배열로 정리하여 순서대로 읽어오도록 만들었다.
- `append()` 로 추가한 알람은 내려오고 다시 올라간뒤 제거된다.
- 만일 알람이 내려오는 도중 후속 알람이 발생하게 된다면 이전 알람은 바로 올라가고 제거되어 알람이 겹치지 않도록 하였다.
- 추가로 알람 재생시 트리거가 되는 날자값을 자동정렬하여 실수로 숫자의 순서를 맞추지 않더라도 문제없도록 만들었다.
    
![10](https://github.com/user-attachments/assets/7f65a920-5026-42ce-a3df-621a89805856)



- 사용코드

```
let notifArry = ["알람메세지"]
let notifTriggerNum = [1000] //알람이 재생하는 타이밍
// 배열 내림차순 정렬
notifTriggerNum.sort(function(a,b){ //숫자 자동 정렬
    return a-b;
});

let notifFlag = 1;
let notifNum = 0;

function tempFnc(){
    if(notifFlag == 1){
        notifFlag = 2
        // 프로젝트 알림 생성하기
        $(".sc-notif").append(
            "<span class=\"notif notif"+notifNum+"\">"+notifArry[notifNum]+"</span>"
            );
            // 프로젝트 알림 애니메이션
            $(".sc-notif .notif"+notifNum).animate({//알림 등장
                top:30,
                opacity:1,
            },300,function(){
                $(this).delay(600).animate({//알림 사라짐
                    top:-30,
                    opacity:0,
                },300,function(){ //알림 html제거
                    $(this).remove();
                    notifFlag = 1;
                })    
            })
        notifNum++;
    }else if(notifFlag==2){ //알림 중단 스크립트
        console.log("애니메이션 실행중단")
        notifFlag = 1;
        $(".sc-notif .notif"+(notifNum-1)).clearQueue().animate({
            top:-30,
            opacity:0,
        },300,function(){
            $(this).remove();
        });
        tempFnc(); //알림 재실행
    };
    loopAnimeFlag++;
}

```

---

### 2.5 함수,변수,배열 내보내기

- 비전공자인 의뢰인이 관리 추가 하기 쉽도록 주요 값들을 변수로 만들어 관리 전용 파일을 따로 만들어 export, import 했다.
