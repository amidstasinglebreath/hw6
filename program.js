//pseudo-constants
var apikey = "e4abe5a765b55cc4973d535c01929241"
var baseUrl = "https://api.openweathermap.org/data/2.5/";

//&appid=" + apikey
// &units=imperial


//important use-variables:
var searchHistory = [];


//save function
function saveHistory(cityEntry) {
  var prevEntry = false;
  for (var i = 0; i < searchHistory.length; i++) {
    if (searchHistory[i] === cityEntry) {
      prevEntry = true;
      i = searchHistory.length;
    }
  }

  if (!prevEntry) {
    searchHistory.push(cityEntry);
  }

  localStorage.setItem("Previous Searches", JSON.stringify(searchHistory));
}


//load/display functions
function displayMain(searchResp) {
  const currentDate = moment().format("M/D/YYYY");
  $("#current-city").empty();

  $("<div>", {
    html: "<h2>" + searchResp.name + " (" + currentDate + ")" + "</h2>",
    class: "city",
    appendTo: "#current-city"
  })
  var icon = $("<div>");
  icon.addClass("icon")
  icon.appendTo("#current-city")
  $("<div>", {
    html: "<p>" + "Temperature: " + searchResp.main.temp.toFixed(1) + " °F" + "</p>",
    class: "temp",
    appendTo: "#current-city"
  })
  $("<div>", {
    html: "<p>" + "Humidity: " + searchResp.main.humidity + "%" + "</p>",
    class: "humidity",
    appendTo: "#current-city"
  })
  $("<div>", {
    html: "<p>" + "Wind Speed: " + searchResp.wind.speed.toFixed(1) + " MPH" + "</p>",
    class: "wind",
    appendTo: "#current-city"
  })
  var icon = $("<div>");
  icon.addClass("icon")

  // call point of getUV
  var lat = searchResp.coord.lat;
  var lon = searchResp.coord.lon;
  getUV(searchResp.coord.lat,searchResp.coord.lon);

  var weatherType = searchResp.weather.main;

  if (weatherType === "Clear") {
    icon.addClass("fas fa-sun");
  }
  else if (weatherType === "Clouds") {
    icon.addClass("fas fa-cloud");
  }
  else if (weatherType === "Snow") {
    icon.addClass("fas fa-snowflake");
  }
  else if (weatherType === "Drizzle") {
    icon.addClass("fas fa-cloud-rain");
  }
  else if (weatherType === "Rain") {
    icon.addClass("fas fa-cloud-showers-heavy");
  }

}


function displayForecast(searchResp) {
  $("#forecast-list").empty();

  for (var i = 1; i < 6; i++) {
    const date = moment().add(i, 'days').format("M/D/YYYY");
    
    var curDayDiv = $("<div class=day>");
    var divDate = $("<h3>");
    divDate.html(date);
    var icon = $("<i>");

    var divTemp = $("<span>");
    divTemp.html("Temp: " + searchResp.list[i].main.temp.toFixed(1) + " °F" + "<br>");
    var divHumidity = $("<span>");
    divHumidity.html("Humidity: " + searchResp.list[i].main.humidity.toFixed(1) + "%")

    curDayDiv.append(divDate, icon, divTemp, divHumidity);

    $("#forecast-list").append(curDayDiv);

    var weatherType = searchResp.list[i].weather[0].main;

    if (weatherType === "Clear")
        icon.addClass("fas fa-sun weatherIcon");

    else if (weatherType === "Clouds")
        icon.addClass("fas fa-cloud weatherIcon");

    else if (weatherType === "Snow")
        icon.addClass("fas fa-snowflake weatherIcon");

    else if (weatherType === "Drizzle")
        icon.addClass("fas fa-cloud-rain weatherIcon");

    else if (weatherType === "Rain")
        icon.addClass("fas fa-cloud-showers-heavy weatherIcon");
}
}

// get function that returns UV
function getUV(lat, lon) {
  var queryURL = baseUrl + "uvi?&lon=" + lon + "&lat=" + lat +  "&appid=" + apikey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (uvResponse) {
      console.log(uvResponse)

      var uvDiv = $("<div>");
      uvDiv.html("UV Index: ");
      var uv = $("<span>");
      uv.addClass("badge");
      uv.html(uvResponse.value);

      if (uvResponse.value < 6) {
        uv.addClass("badge-success");
      } else {
        uv.addClass("badge-danger")
      }

      uvDiv.append(uv);
      $("#current-city").append(uvDiv);

    });
}


//search function
function search(cityName) {
  var queryURL = baseUrl + "weather?q=" + cityName + "&appid=" + apikey + "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);

      displayMain(response);
      //save function call
      saveHistory(cityName);

      $.ajax({
        url: baseUrl + "forecast?q="+ cityName + "&appid=" + apikey + "&units=imperial",
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
          displayForecast(response);
        });




    });
}

//search("Seattle");

//onclick register search
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var city = $("#search-input").val();
  search(city);
})



//onclick register history
