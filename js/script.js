// Implement the 2 following features, plus the bonus feature if you can 💪:

// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

//formatting date parameters if they<10 (ex "4" => "04")

function formatDate(value) {
  if (value < 10) {
    value = `0${value}`;
    return value;
  }
}

//function for updating innerHTML
function updateValue(inputID, inputValue) {
  let input = document.querySelector(inputID);
  input.innerHTML = inputValue;
}

function changeTemperature(responce) {
  let location = responce.data.name;
  updateValue("#cityName", location);

  let currentTemperature = Math.round(responce.data.main.temp);
  currentTemperature = `${currentTemperature}℃`;
  updateValue("#temperature", currentTemperature);

  let currentHymidity = `${responce.data.main.humidity}%`;
  updateValue("#hymidity", currentHymidity);

  let currentWind = Math.round(responce.data.wind.speed);
  currentWind = `${currentWind}km/h`;
  updateValue("#wind", currentWind);

  let currentClouds = `${responce.data.clouds.all}%`;
  updateValue("#clouds", currentClouds);

  const weatherDescriptionIcon = {
    "clear sky": "clearSky.svg",
    "few clouds": "clearSky.svg",
    "scattered clouds": "sunAndClouds.svg",
    "broken clouds": "sunAndClouds.svg",
    "overcast clouds": "clouds.svg",
    "shower rain": "showerRain.svg",
    "light rain": "showerRain.svg",
    rain: "rain.svg",
    thunderstorm: "thunderstorm.svg",
    snow: "snow.svg",
    mist: "mist.svg",
    "overcast clouds": "clouds.svg",
  };

  let weatherIconKey = responce.data.weather[0].description;
  let weatherIcon = `<img
      src="images/${weatherDescriptionIcon[weatherIconKey]}"
      id="weather-icon"
      alt="${weatherIconKey}"
    />`;
  updateValue("#current-weather-icon", weatherIcon);

  // weatherIcon = `<img src="images/${weatherIcon}" id="weather-icon" alt="rainy weather" />`;
  // updateValue("#current-weather-icon", weatherIcon);
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

  // const cDate = `;
  // ${now.getDate()}
  // ${months[now.getMonth()]}
  // ${now.getFullYear()}
  // ${now.getHours()}:${now.getMinutes()}`;
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

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

// function updateRandomTemperature() {
//   let temperature = Math.random();
//   let scale = document.querySelector("#scale");
//   temperature = temperature * 100 - 50;
//   temperature = Math.round(temperature);
//   document.querySelector("#temperature").innerHTML = temperature;
// }

function updateLocation(inputLocation) {
  document.querySelector("h1").innerHTML = inputLocation;
}

// In your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
// Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function changeLocation(event) {
  event.preventDefault();
  let inputLocation = document.querySelector("#search-city-input");
  let curLocation;
  if (inputLocation.value.length > 0) {
    updateLocation(inputLocation.value);
    curLocation = inputLocation.value;
  } else {
    updateLocation("Khmel'nytsky");
    curLocation = "Khmel'nytsky";
    alert("Please, enter a city");
  }

  const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";
  const units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${curLocation}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeTemperature);
  console.log(apiUrl);
}

let searchForm = document.querySelector("#location-form");
searchForm.addEventListener("submit", changeLocation);

// 🙀 Bonus point:
// Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

//https:api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function showPositionWeather(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let inputLocation = document.querySelector("#search-city-input");

  const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";
  const units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(changeTemperature);
  console.log(apiUrl);
}

function currentPositionWeather(event) {
  event.submitDefault;
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let geolocationButton = document.querySelector("#current-location-button");
geolocationButton.addEventListener("click", currentPositionWeather);
