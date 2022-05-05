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
    var userInput = function(event) {
        event.preventDefault();

        var selectedCity = searchFieldEl.value.trim();
        console.log(selectedCity);

        if(selectedCity) {
            wxVariables(selectedCity);
            clearFiveDay;
        } else {
            alert("You must enter a city name to receieve the Weather.");
        }
    };
    // fetch the api
    let wxVariables = function(city) {
        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da22a2bf7ee7ea47d8c047b479d0cd14";

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
    let wxConditions = function(weather, city) {
        // gets the weather Icon depending on the current conditions
        let wxIcon = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
        // using jquery to show the current weather of the user's selected city
        $("#inputCity").text(weather.name);
        $("#wxIcon").attr("src", wxIcon);
        $("#temp").text(weather.main.temp);
        $("#wind").text(weather.wind.speed);
        $("#humid").text(weather.main.humidity);
        // setting lat long as variables to implement the coordinates from api call
        let lat = weather.coord.lat;
        let long = weather.coord.lon;
        // fetching the uv index for the selected city
        let uvApiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&units=imperial&appid=da22a2bf7ee7ea47d8c047b479d0cd14";
        console.log(uvApiUrl);
        fetch(uvApiUrl)
        .then(function(response){
            response.json().then(function(uvIndex){
                // using jquery to set the index value and then adding classes to change the bg color based on the variable 
                $("#uv").text(uvIndex.value);
                // https://www.epa.gov/sunsafety/uv-index-scale-0 UV index scale
                if(uvIndex.value <= 2) {
                    $("#uv").removeClass("bg-danger");
                    $("#uv").removeClass("bg-warning");
                    $("#uv").addClass("bg-success");
                } else if(uvIndex.value >= 2 && uvIndex.value <= 7) {
                    $("#uv").removeClass("bg-success");
                    $("#uv").removeClass("bg-danger");
                    $("#uv").addClass("bg-warning");
                } else {
                    $("#uv").removeClass("bg-success");
                    $("#uv").removeClass("bg-warning");
                    $("#uv").addClass("bg-danger");
                }
            });
        });
        // calls five day function when the user selects a city so it also generates next 5 days for that city
        fiveDay(city, lat, long);
    };
    // five day function and fetching the forecast
    let fiveDay = function(city, lat, long) {
        
        let fiveDayApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=imperial&appid=da22a2bf7ee7ea47d8c047b479d0cd14";
        fetch(fiveDayApiUrl)
        .then(function(response){
            response.json().then(function(res){
                // calls to clear the weather when the user inputs a new city
                clearFiveDay();
                for(let i=0; i < res.list.length; i++) {
                    let list = res.list[i];
                    let time = list.dt;
                    let timeOffset = res.city.timezone;
                    let timeOffsetHours = timeOffset/60/60;
                    let timeMoment = moment.unix(time).utc().utcOffset(timeOffsetHours);
                    // grabbing the time of 12:00 for the forecast since it is done every 3 hours I wanted the middle of the day 
                    if(timeMoment.format('HH:mm') >= "11:00" && timeMoment.format('HH:mm') <= "13:00") {
                        // creating elements to put in the five day forecast 

                        let cardEl = document.createElement("div");
                        cardEl.classList = "card bg-info col-2";

                        let dateEl = document.createElement("h4");
                        dateEl.classList = "card-header text-light";
                        dateEl.textContent = timeMoment.format("MMM Do");

                        let fiveDayIcon = document.createElement("img");
                        icons = "https://openweathermap.org/img/w/" + list.weather[0].icon + ".png";
                        // utilized jquery here due to not being able to figure out how to do it with let
                        $(fiveDayIcon).attr("src", icons);
                        
                        let temp = document.createElement("p");
                        temp.classList = "fs-3 text-light";
                        temp.textContent = "Temp: " + list.main.temp + "°F";

                        let wind = document.createElement("p");
                        wind.classList = "fs-3 text-light";
                        wind.textContent = "Wind: " + list.wind.speed + "MPH";

                        let humid = document.createElement("p");
                        humid.classList = "fs-3 text-light";
                        humid.textContent = "Humidity: " + list.main.humidity + "%";
                        // appending it to show up where i want 
                        fiveDayEl.appendChild(cardEl);
                        cardEl.appendChild(dateEl);
                        cardEl.append(fiveDayIcon);
                        cardEl.appendChild(temp);
                        cardEl.appendChild(wind);
                        cardEl.appendChild(humid);
                    }

                };
            });
        });
    }


// clear the 5 day to input the new cities weather the next 5 days
let clearFiveDay = function() {
    var clear = fiveDayEl.lastElementChild
    while (clear) {
        fiveDayEl.removeChild(clear);
        clear = fiveDayEl.lastElementChild
    }
};
// once the user searches a city it will run the function 
searchFormEl.addEventListener("submit", userInput);
})