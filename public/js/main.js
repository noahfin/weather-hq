
"use strict";
(function () {
   var icons = {
    "clear-day" : "B",
     "clear-night": "C", 
     "rain": "R", 
     "snow":"G", 
     "sleet": "X", 
     "wind": "S", 
     "fog": "N",
     "cloudy": "Y",
     "partly-cloudy-day": "H",
     "partly-cloudy-night": "I"
   }

   loadCity("new york")
   $('a.city').bind("click", function() {
     loadCity($(this).html());  
   })
   function loadCity(city) {
    $("#location")
     console.log(city.toLowerCase())
       $('#location').html(city);
       if (city.toLowerCase() == "current location") {

          if ( navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( currentLocation, loadDefaltCity);
          } else {
            loadDefaltCity();
          }

       } else {
          loadWeather(city.toLowerCase());

       }
   }
   function currentLocation(pos) {    
     console.log(pos.coords.longitude)
     $.ajax({
       url: '/' + pos.coords.latitude + "/" +pos.coords.longitude,
     })
     .done(function(json) {
       $("#current_temp").html(Math.round(json.currently.temperature)+"&#176:F");
       $("#current_summary").html(json.currently.summary);
       $(".w-icon").attr("data-icon", icons[json.currently.icon]);
      })
      .fail(function() {
        alert("Ajax failed to fetch data")
      })

   }
   function loadDefaltCity() {
    loadCity("New York");
   }
   function loadWeather(city) {
      
    $.ajax({
        url: '/' + city,
      })
      .done(function(json) {
        $("#current_temp").html(Math.round(json.currently.temperature)+"&#176:F");
        $("#current_summary").html(json.currently.summary);
        $("#current_temp").attr("data-icon", icons[json.currently.icon]);
      })
      .fail(function() {
        alert("Ajax failed to fetch data")
      })
   }

})();