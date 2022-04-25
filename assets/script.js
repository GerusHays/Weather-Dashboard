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
    // set the moment js to get the dates for the cities
    $("#dates").text(moment().format('LL'));
    // check for the users input for what city they select
    // if they dont sselect a city alert them to pick one
    var userInpit = function() {
        preventDefault();

        var selectedCity = inputCity.value.trim();

        if(selectedCity) {
            wxVariables(selectedCity);
            clearFiveDay;
        } else {
            alert("You must enter a city name to receieve the Weather.");
        }
    };
    // fetch the api
    var wxVariables = function(city) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da22a2bf7ee7ea47d8c047b479d0cd14";

        fetch(apiUrl)
            .then(function(response){
                // api request was successful
                if(response.ok) {
                    console.log(response);
                    response.json().then(function(data){
                        console.log(data);
                        wxConditions(data, city);
                    });
                } else {
                    alert("Error: Could not receive that city's weather data");
                }
            })
            .catch(function(error){
                alert("Unable to receive weather data please try again later.");
            });
    };
    // receive the cities weather
    var wxConditions = function(weather, city) {

    }


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