import {greenMaterial,donutMaterial} from './threeControl.js';
import {
    pauseTimeCon,
    intervalTimeCon,
    earthOpacityCon,
    tempNow,
    tempCon,
    notifArry,
    notifTriggerNum,
    limitDate,
    startDate,
    notifiTrigger,
    donutRed,
    donutGreen,
    donutBlue,
} from "./control.js"

// 컨트롤 요소 스크립트 선언
let play = 0;
let sequence = 0;
let pauseTime = pauseTimeCon;
let intervalTime = intervalTimeCon;


// 시작온도 세팅
function tempSetting(){
    $(".sc-temperature .temperature").css('clip-path','polygon(0 '+(100-tempNow)+'%, 100% '+(100-tempNow)+'%, 100% 95%, 0% 95%)');
    $(".sc-temperature .value").text(tempNow+".0");
}
tempSetting()


// 날짜계산 스크립트
let today = new Date(limitDate).getTime();
let originDate = new Date(startDate).getTime()

// 날짜차이 계산
let dateValue = today - originDate; //날짜차이 밀리세컨드
let diffDate = Math.floor(dateValue / (1000 * 60 * 60 * 24)); //날짜차이 일수

let korDate = ["일","월","화","수","목","금","토"]


// 날짜 트리거값 변환
let notifCon = []
let k;
for(k=0;k < notifTriggerNum.length;k++){
    notifCon[k] = notifTriggerNum[k];
    notifCon[k] = new Date(notifCon[k]).getTime();
    notifCon[k] = notifCon[k] - originDate;
    notifCon[k] = Math.floor(notifCon[k]/(1000 * 60 * 60 * 24));
    notifCon[k] = Math.floor(notifCon[k]*pauseTime/diffDate);
}
// 배열 내림차순 정렬
notifCon.sort(function(a,b){
    return a-b;
});



// 프로젝트 알림 스크립트
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
                $(this).delay(notifiTrigger).animate({//알림 사라짐
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

// 지구본 글로우 색상값
let red;
let green;
let blue;

let donutRedCon = donutRed* 30 / 100
let donutGreenCon = donutGreen* 25 / 100
let donutBlueCon = donutBlue* 30 / 100



// 루프 애니메이션 스크립트 선언
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
    }else if(sequence == notifCon[loopAnimeFlag]){ //알림 재생 타이밍
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
        red = 30 - sequence * donutRedCon / pauseTime;
        green = 25 - sequence * donutGreenCon / pauseTime;
        blue = sequence * donutBlueCon / pauseTime;
        donutMaterial.color.setRGB(red,green,blue)
        greenMaterial.opacity = sequence * (earthOpacityCon-0.5) / pauseTime;
        // 프로젝트 날짜
        let incress = Math.floor(play*diffDate/pauseTime)*1000*60*60*24;//날짜차이 숫자 증가의 밀리세컨드값
        let incNum = new Date(originDate+incress) //시작일로부터 증가하는 날짜
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







// 지구본 애니메이션
$(".sc-play .play-btn").click(function(){

    
    
    // 정지버튼 스크립트
    if( $(".sc-play .play-btn").attr('class') == "play-btn on" ){
        clearInterval(interval);
    } else{
        // 루프 애니메이션 스크립트 호출
        interval = setInterval(loopAnimation,intervalTime);
    }
    
    
    $(".sc-play .play-btn").toggleClass('on');
    
});