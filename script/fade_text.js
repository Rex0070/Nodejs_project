const Arr = new Array('perfect', 'sexy', 'good', 'beautiful', 'great', 'amazing', 'wonderful', 'cool');
const span = document.getElementById('test');
const Rnumber = 3;
var number = 0;

function paintText(){
    $(document).ready(()=>{
        if(number>=8){
            number = 0;
        }
        $("#test").fadeTo(500, 1);
        span.innerHTML = Arr[number++];
        $("#test").fadeTo(4000, 0);
        if(number==1){
            span.style.width = "130px";
        } else if(number==2){
            span.style.width = "80px";
        } else if(number==3){
            span.style.width = "120px";
        } else if(number==4){
            span.style.width = "160px";
        } else if(number==5){
            span.style.width = "90px";
        } else if(number==6){
            span.style.width = "150px";
        } else if(number==7){
            span.style.width = "180px";
        } else if(number==8){
            span.style.width = "80px";
        }
    })
}

function init(){
    paintText();
    setInterval(paintText, 4500);
}

init();