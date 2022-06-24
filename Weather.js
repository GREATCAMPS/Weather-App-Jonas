const key = "c4e5177d9b4e3609676c3fdf074d8f03";

let cityID = "5780993";

let response = fetch(
  "https://api.openweathermap.org/data/2.5/weather?id=" +
    cityID +
    "&appid=" +
    key
)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    displayWeather(response);
  });

function showIcon(response) {
  let time = Date.now() / 1000;
  const sunset = parseInt(response.sys.sunrise);
  const sunrise = parseInt(response.sys.sunrise);
  if (time > sunset && time < sunrise) {
    document.querySelector(".Night").style.display = "inline";
  } else if (
    response.weather[0].description.includes("partly") ||
    response.weather[0].main.includes("partly")
  ) {
    document.querySelector(".Partly").style.display = "inline";
  } else if (
    response.weather[0].description.includes("snowy") ||
    response.weather[0].main.includes("snowy")
  ) {
    document.querySelector(".Snowy").style.display = "inline";
  } else if (
    response.weather[0].description.includes("cloud") ||
    response.weather[0].main.includes("cloud")
  ) {
    document.querySelector(".Cloudy").style.display = "inline";
  } else if (
    response.weather[0].description.includes("rain") ||
    response.weather[0].main.includes("rain")
  ) {
    document.querySelector(".Rainy").style.display = "inline";
  } else {
    document.querySelector(".Sun").style.display = "inline";
  }
}

function displayWeather(response) {
  console.log(response);
  document.querySelector(".location").innerHTML =
    "Weather for " + response.name;
  document.querySelector(".condition").innerHTML =
    "Condition: " + response.weather[0].description;
  document.querySelector(".temp").innerHTML =
    "Temperature: " +
    ((9.0 * (parseFloat(response.main.temp) - 273.15)) / 5.0 + 32).toFixed(0) +
    "&degF";
  document.querySelector(".humidity").innerHTML =
    "Humidity " + response.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    "Wind speed:  " + response.wind.speed + " mph";

  showIcon(response);
}
