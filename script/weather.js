var apiurl = "http://api.openweathermap.org/data/2.5/weather?q=Gwangju&appid=a24a83d36f194044d7fd0d0f0f62effb";
const cur_img = document.getElementById("img");
const weather = document.querySelector('.js-weather');

$.ajax({
    url: apiurl,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function(resp) {
        weather.innerHTML = `${resp.main.temp- 273.15} ${resp.name}`;
        var imgurl = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        cur_img.src=`${imgurl}`;               
    }
})