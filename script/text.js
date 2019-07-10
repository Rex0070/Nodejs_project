const INPUT = document.getElementById('sc');
const T_NUM = 2;
const Arr_morning = new Array('Good Morning,');
const Arr_afternoon = new Array('Good Afternoon,');
const Arr_evening = new Array('Good Evening,');


function paintText(textnumber){
    const date = new Date();
    const hours = date.getHours();
    if(hours > 12 && hours < 18){
        INPUT.value = Arr_afternoon[0];
    } else if(hours > 18 && hours < 24){
        INPUT.value = Arr_evening[0];
    } else {
        INPUT.value = Arr_morning[0];
    }
}

function getRandom(){
    const number = Math.floor(Math.random() * T_NUM);
    return number;
}

function init(){
    const randomnumber = getRandom();
    paintText(randomnumber);
}

init();
