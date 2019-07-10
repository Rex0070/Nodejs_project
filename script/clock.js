const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    if(hours < 12){
        clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ?
         `0${minutes}` : minutes}`
    } else {
        clockTitle.innerText = `PM ${hours-12}:${minutes < 10 ?
            `0${minutes}` : minutes}`
    }
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();