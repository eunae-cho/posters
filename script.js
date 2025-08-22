// //전역변수 지역변수 
const $body = document.querySelector('body');
let dataWeather = $body.getAttribute('data-weather');

const $picker = document.querySelector('#choose-weather>ul');
$picker.addEventListener("click", selectWeather);

let $background;
const $sun = document.querySelector(".sun");
const $sunLight = document.querySelector(".sun-light");


function setBack() {
    console.log("call::setBack");

    if(dataWeather==('sunny')) {
        $background.addEventListener("mousemove", traceMouse);
    }
    else if(dataWeather=="snowy") {
        $background.addEventListener("click", drawSnow);
    }
    else if(dataWeather==="rainy") {
        window.addEventListener("mousewheel", scrollBack);
    }
    else if(dataWeather=="cloudy") {
        $background.style.background = "#3E88CC";
        $background.addEventListener("click", drawRounds);
    }
}

function selectWeather(e) {
    dataWeather = e.target.id;
    $body.setAttribute('data-weather', e.target.id);
    $background = document.querySelector(`#weather-is-${dataWeather} .background`);

    setBack();

    //클릭시 다른 요소들은 회색 배경, 클릭한 것은 검은 컬러
    [...$picker.children].forEach((child)=> {
        child.style.background='rgba(182, 182, 182, 0.284)';
        child.style.color='#fff';
    })

    e.target.style.background='none';
    e.target.style.color='#000';
}


function traceMouse(e) {
    $sunLight.style.top = `${e.screenY}px`;
    $sunLight.style.left = `${e.clientX/2}px`;

    var lightX = e.screenX/$sun.clientWidth * 32;
    var lightY = e.screenY/$sun.clientHeight * 32;
    
    $sun.style.boxShadow = `inset ${lightX}px ${lightY}px 32px  #ff919179`;
}

function drawSnow(e) {
    const randomSize = Math.random()*500;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // console.log(mouseX, mouseY);

    const newStamp = document.createElement("div");
    newStamp.style.position = 'fixed';
    newStamp.style.display = 'inline';
    newStamp.style.top = `${mouseY-0.16*randomSize}px`;
    newStamp.style.left = `${mouseX-0.5*randomSize}px`;
    newStamp.innerText = '❄︎';
    newStamp.style.fontSize = `${randomSize}px`;
    newStamp.style.color = '#EEF6EB';
    newStamp.style.textShadow = '2px 4px 6px rgba(203, 203, 203, 0.177), -3px -3px 5px rgba(233, 253, 238, 0.69)';
    newStamp.style.pointerEvents = 'none';
    newStamp.style.lineHeight = '0.8em';

    $background.appendChild(newStamp);
}

function scrollBack(e) {
    var setGrd = (e.deltaY > 0) ? 1 : 0;

    $bgGrd1 = document.getElementsByClassName('bg-gradient-1');
    $bgGrd2 = document.getElementsByClassName('bg-gradient-2');
    
    if(setGrd){
        $bgGrd1[0].style.top= `${e.deltaY/2}%`;
        $bgGrd1[1].style.top= `${e.deltaY/2}%`;
        $bgGrd2[0].style.top= `${25 - (e.deltaY/2)}%`;
        $bgGrd2[1].style.top= `${25 - (e.deltaY/2)}%`;
    } else {
        $bgGrd1[0].style.top= `${25 - (e.deltaY/2)}%`;
        $bgGrd1[1].style.top= `${25 - (e.deltaY/2)}%`;
        $bgGrd2[0].style.top= `${e.deltaY/2}%`;
        $bgGrd2[1].style.top= `${e.deltaY/2}%`;
    }
}

function drawRounds() {
    var round = document.createElement('div');
        round.className = 'rounds';
        round.style.position = 'absolute';
        round.style.top = `${Math.random()*1000}px`;
        round.style.left = `${Math.random()*1000}px`;
        round.style.width = `${Math.random()*500}px`;
        round.style.height = `${Math.random()*400}px`;
        round.style.borderRadius = '100%';
        round.style.border = `solid 1px rgb(255, 255, 255)`;
        
        $background.appendChild(round);
}