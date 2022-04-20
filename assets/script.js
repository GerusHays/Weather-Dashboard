$(document).ready(function() {
    const apiKey = "da22a2bf7ee7ea47d8c047b479d0cd14";
  
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










})