$(document).ready(function() {
    // global variables
    const apiKey = "da22a2bf7ee7ea47d8c047b479d0cd14";

    let searchFormEl = document.getElementById("searchForm");
    let searchFieldEl = document.getElementById("searchField");
    let todaysWeather = document.getElementById("todaysWeather");
    let inputCity = document.getElementById("inputCity");
    let todaysWx = document.getElementById("dates");
    let wxSymbols = document.getElementById("wxIcon");
    let tempEL = document.getElementById("temp");
    let windEl = document.getElementById("wind");
    let humidEl = document.getElementById("humid");
    let uvEl = document.getElementById("uv");
    let fiveDayEl = document.getElementById("fiveDay");

    $("#dates")
    
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos, crd) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);

    $("#searchBtn").on("click", function(){
        var cityName = $("#searchField").val()
        getWeather(crd);
    })

    const getWeather = (crd) => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${apiKey}`)
        // let lat = crd.latitude;
        // let long = crd.longitude;
        // console.log(lat, long);
        console.log(crd);
    }

console.log(location);

// clear the 5 day to input the new cities weather the next 5 days
let clearFiveDay = function() {
    var clear = fiveDayEl.lastElementChild
    while (clear) {
        fiveDayEl.removeChild(clear);
        clear = fiveDayEl.lastElementChild
    }
};

searchFormEl.addEventListener("submit", userInpit, clearFiveDay);
})