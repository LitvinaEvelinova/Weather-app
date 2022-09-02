let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};


function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = "9f19ccbb495d9cacd63f236963dafe78";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchWeather);

function getCurrentTime(time) {
  
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let day = time.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  

  return `${days[day]}, ${hours}:${min}`;
}


let currentTime = document.querySelector(".time");
let time = new Date();
currentTime.innerHTML = getCurrentTime(time);

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
   let units = "metric";
  let apiUrlLink = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "9f19ccbb495d9cacd63f236963dafe78";
  let apiUrl = `${apiUrlLink}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let buttonLocation = document.querySelector("#button-location");
buttonLocation.addEventListener("click", currentLocation);

search("New York");
