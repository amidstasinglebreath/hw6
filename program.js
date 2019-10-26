//pseudo-constants
var apikey = "e4abe5a765b55cc4973d535c01929241"
var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

//&appid=" + apikey
// &units=imperial


//important use-variables:
var searchHistory = [];


//save function
function savehistory(cityEntry){
  var prevEntry = false;
  for (var i = 0; i < searchHistory.length; i++){
    if (searchHistory[i] === cityEntry){
      prevEntry = true;
      i = searchHistory.length;
    }
  }

  if (!prevEntry){
    searchHistory.push(cityEntry);
  }

  localStorage.setItem("Previous Searches", JSON.stringify(searchHistory));
}


//load/display functions
function displayMain(searchResp){
    var mainW = $
}

function displayForecast(searchResp){

}

function getUV(lat, lon){
  var queryURL = "https://api.openweathermap.org/data/2.5/uvi?&lat" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
          
        });
}


//search function
function search(cityName){
    var queryURL = baseUrl + cityName + "&appid=" + apikey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
          console.log(queryURL);
  
          // Log the resulting object
          console.log(response);
  
          // Transfer content to HTML
          $(".city").html("<h1>" + response.name + " Weather Details</h1>");
          $(".wind").text("Wind Speed: " + response.wind.speed);
          $(".humidity").text("Humidity: " + response.main.humidity);
          $(".temp").text("Temperature (F) " + response.main.temp);
  
          // Log the data in the console as well
          console.log("Wind Speed: " + response.wind.speed);
          console.log("Humidity: " + response.main.humidity);
          console.log("Temperature (F): " + response.main.temp);
        });
}

//search("Seattle");

//onclick register search



//onclick register history
