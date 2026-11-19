import "./style.css";

const searchBtn = document.querySelector(".search-btn");
const farenheitSpan = document.querySelector(".fahrenheit-unit");
const celciusSpan = document.querySelector(".celsius-unit");

searchBtn.addEventListener("click", () => {
  const locationName = document.querySelector("#location").value;
  fetchWeatherData(locationName);
});
farenheitSpan.addEventListener("click", () => {
  changeUnitsToFahrenheit();
  farenheitSpan.classList.add("active-unit");
  celciusSpan.classList.remove("active-unit");
});
celciusSpan.addEventListener("click", () => {
  changeUnitsToCelcius();
  farenheitSpan.classList.remove("active-unit");
  celciusSpan.classList.add("active-unit");
});

let temperatureObject = null;

async function fetchWeatherData(location) {
  try {
    const KEY = "E3VBXLTQ9CYL8XZ4SZFDXENYQ";
    let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}`;
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);

    temperatureObject = {};
    temperatureObject.days = [];

    const icon = document.querySelector(".weather-icon");
    const temp = document.querySelector(".temp-value");
    const precipitation = document.querySelector(".precipitation-val");
    const humidity = document.querySelector(".humidity-val");
    const wind = document.querySelector(".wind-val");

    document.querySelector(".city-name").textContent;
    icon.src = `./icons/${data.currentConditions.icon}.png`;
    temp.textContent = data.currentConditions.temp;
    precipitation.textContent = `${data.currentConditions.precip} %`;
    humidity.textContent = `${data.currentConditions.humidity} %`;
    wind.textContent = `${data.currentConditions.windspeed} mph`;

    temperatureObject.temp = data.currentConditions.temp;

    // days

    const daysContainter = document.querySelector(".forecast-days");
    daysContainter.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const tempDiv = document.createElement("div");
      const dateStr = data.days[i].datetime;

      div.classList.add(`day`);
      tempDiv.classList.add(`day-div-temp`);
      div.innerText = new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
      });

      div.style.width = "80px";
      img.src = `./icons/${data.days[i].icon}.png`;
      tempDiv.textContent = `${Math.round(data.days[i].tempmin)}° ${Math.round(data.days[i].tempmax)}°`;

      temperatureObject.days[i] = {};

      temperatureObject.days[i].min = Math.round(data.days[i].tempmin);
      temperatureObject.days[i].max = Math.round(data.days[i].tempmax);

      div.append(img, tempDiv);
      daysContainter.appendChild(div);
    }
    document.querySelector(".weather-main").style.display = "flex";
  } catch (error) {
    console.error(error);
  }
}

function changeUnitsToCelcius() {
  temperatureObject.temp = Math.round(convertToCelcius(temperatureObject.temp));
  const tempDiv = document.querySelector(".temp-value");
  const daysDivsNods = document.querySelectorAll(".day-div-temp");
  const daysDivs = [...daysDivsNods];
  console.log(daysDivs);
  tempDiv.textContent = temperatureObject.temp;
  for (let i = 0; i < 7; i++) {
    temperatureObject.days[i].min = Math.round(
      convertToCelcius(temperatureObject.days[i].min),
    );

    temperatureObject.days[i].max = Math.round(
      convertToCelcius(temperatureObject.days[i].max),
    );

    daysDivs[i].textContent =
      `${temperatureObject.days[i].min}° ${temperatureObject.days[i].max}°`;
  }
  console.log(temperatureObject);
}

function changeUnitsToFahrenheit() {
  temperatureObject.temp = Math.round(
    convertToFahrenheit(temperatureObject.temp),
  );
  const tempDiv = document.querySelector(".temp-value");
  const daysDivsNods = document.querySelectorAll(".day-div-temp");
  const daysDivs = [...daysDivsNods];
  console.log(daysDivs);
  tempDiv.textContent = temperatureObject.temp;
  for (let i = 0; i < 7; i++) {
    temperatureObject.days[i].min = Math.round(
      convertToFahrenheit(temperatureObject.days[i].min),
    );

    temperatureObject.days[i].max = Math.round(
      convertToFahrenheit(temperatureObject.days[i].max),
    );

    daysDivs[i].textContent =
      `${temperatureObject.days[i].min}° ${temperatureObject.days[i].max}°`;
  }
  console.log(temperatureObject);
}

function convertToFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}

function convertToCelcius(fahrenheit) {
  return (fahrenheit - 32) / 1.8;
}

console.log(convertToFahrenheit(20));

console.log(convertToCelcius(68));
