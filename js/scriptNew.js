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

  updateValue("#temperature", Math.round(responce.data.main.temp));

  updateValue("#hymidity", `${responce.data.main.humidity}%`);

  let currentWind = Math.round(responce.data.wind.speed);
  updateValue("#wind", `${currentWind}km/h`);

  updateValue("#clouds", `${responce.data.clouds.all}%`);

  weatherIcon = `<img
      src="http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png"
      id="weather-icon"
      alt="${responce.data.weather[0].description}"
    />`;
  updateValue("#current-weather-icon", weatherIcon);
}

const apiKey = "bd6a33bf1ae4ff07cbfe080ca9b11f66";
let units = "metric";
let curLocation = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${curLocation}&appid=${apiKey}&units=${units}`;
console.log(apiUrl);
axios.get(apiUrl).then(showWeather);
// console.log(apiUrl);
