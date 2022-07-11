const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";

function formatDate(value) {
  if (value < 10) {
    value = `0${value}`;
    return value;
  }
}

function updateValue(inputID, inputValue) {
  let input = document.querySelector(inputID);
  input.innerHTML = inputValue;
}

function currentTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const curDay = days[now.getDay()];
  let curDate = now.getDate();
  formatDate(curDate);
  let curHours = now.getHours();
  formatDate(curHours);
  let curMinutes = now.getMinutes();
  formatDate(curMinutes);

  const cDate = `
  ${curDate} 
  ${months[now.getMonth()]} 
  ${now.getFullYear()} 
  ${curHours}:${curMinutes}`;

  let currentDay = document.querySelector("#currentDay");
  currentDay.innerHTML = curDay;

  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = cDate;
}

currentTime();

function showWeather(responce) {
  console.log(responce.data);

  updateValue("#cityName", responce.data.name);

  celsiusTemperature = Math.round(responce.data.main.temp);

  updateValue("#temperature", celsiusTemperature);

  updateValue("#hymidity", responce.data.main.humidity);

  updateValue("#wind", Math.round(responce.data.wind.speed));

  updateValue("#clouds", responce.data.clouds.all);

  weatherIcon = `<img
      src="http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png"
      id="weather-icon"
      alt="${responce.data.weather[0].description}"
      title="${responce.data.weather[0].description}"
    />`;
  updateValue("#current-weather-icon", weatherIcon);
}

function search(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function changeLocation(event) {
  event.preventDefault();
  let inputLocation = document.querySelector("#search-city-input");
  console.log(inputLocation.value);
  if (inputLocation.value.length > 0) {
    search(inputLocation.value);
  }
}

// Current Geolocation weather
function showPositionWeather(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let inputLocation = document.querySelector("#search-city-input");

  const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";
  const units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function currentPositionWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fTemperature = (9 * celsiusTemperature) / 5 + 32;
  console.log(fTemperature);
  temperatureElement.innerHTML = Math.round(fTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let geolocationButton = document.querySelector("#current-location-button");
geolocationButton.addEventListener("click", currentPositionWeather);

// console.log(apiUrl);

let celsiusTemperature = null;

const form = document.querySelector("#location-form");
form.addEventListener("submit", changeLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
