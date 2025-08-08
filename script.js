document.body.dataset.weather = "cloudy";

var weather = document.body.dataset.weather;

const $background = document.querySelector(`#weather-is-${weather} .background`);
const $sun = document.querySelector(".sun");
const $sunLight = document.querySelector(".sun-light");

if(weather=="sunny") {
    document.querySelector("#weather-is-snowy").style.display = 'none';
    document.querySelector("#weather-is-rainy").style.display = 'none';
    document.querySelector("#weather-is-cloudy").style.display = 'none';
    $background.style.background=`linear-gradient(90deg, #BCCCD1, #E8E1E1, #FFFFF2)`;
    $background.addEventListener("mousemove", traceMouse);
}
else if(weather=="snowy") {
    document.querySelector("#weather-is-sunny").style.display = 'none';
    document.querySelector("#weather-is-rainy").style.display = 'none';
    document.querySelector("#weather-is-cloudy").style.display = 'none';
    $background.style.background=`rgb(240, 255, 244)`;
    $background.addEventListener("click", drawSnow);
}
else if(weather=="rainy") {
    document.querySelector("#weather-is-sunny").style.display = 'none';
    document.querySelector("#weather-is-snowy").style.display = 'none';
    document.querySelector("#weather-is-cloudy").style.display = 'none';

    $background.style.background = "#6B2BF4";
    $background.style.display = 'flex';
    window.addEventListener("mousewheel", scrollBack);
}
else if(weather=="cloudy") {
    document.querySelector("#weather-is-sunny").style.display = 'none';
    document.querySelector("#weather-is-snowy").style.display = 'none';
    document.querySelector("#weather-is-rainy").style.display = 'none';
    $background.style.background = "#3E88CC";
    $background.addEventListener("click", drawRounds);
}


function traceMouse(e) {
    $sunLight.style.top = `${e.screenY}px`;
    $sunLight.style.left = `${e.screenX}px`;

    var lightX = e.screenX/$sun.clientWidth * 32;
    var lightY = e.screenX/$sun.clientHeight * 32;
    
    $sun.style.boxShadow = `inset ${lightX}px ${lightY}px 32px  #ff919179`;
}

function drawSnow(e) {
    const randomSize = Math.random()*500;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    console.log(mouseX, mouseY);

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