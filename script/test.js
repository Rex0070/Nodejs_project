const Arr = new Array('perfect', 'sexy', 'good', 'beautiful', 'great', 'amazing', 'wonderful', 'cool', 'lovely');
const span = document.getElementById('test');
const Rnumber = 3;
var number = 0;

function paintText(){
    $(document).ready(()=>{
        if(number>=9){
            number = 0;
        }
        $("#test").fadeTo(500, 1);
        span.innerHTML = Arr[number++];
        $("#test").fadeTo(4000, 0);
    })
    console.log(number);
}

function init(){
    paintText();
    setInterval(paintText, 4400);
}

init();