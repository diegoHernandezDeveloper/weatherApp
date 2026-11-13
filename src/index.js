import "./style.css";

const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  const locationName = document.querySelector("#location").value;
  fetchWeatherData(locationName);
});

async function fetchWeatherData(location) {
  try {
    const KEY = "E3VBXLTQ9CYL8XZ4SZFDXENYQ";
    let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}`;
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);

    const icon = document.querySelector(".weather-icon");
    const temp = document.querySelector(".temp-value");
    const precipitation = document.querySelector(".precipitation-val");
    const humidity = document.querySelector(".humidity-val");
    const wind = document.querySelector(".wind-val");

    icon.src = `./icons/${data.currentConditions.icon}.png`;
    temp.textContent = data.currentConditions.temp;
    precipitation.textContent = `${data.currentConditions.precip} %`;
    humidity.textContent = `${data.currentConditions.humidity} %`;
    wind.textContent = `${data.currentConditions.windspeed} mph`;

    // days

    const daysContainter = document.querySelector(".forecast-days");
    daysContainter.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const tempDiv = document.createElement("div");

      const dateStr = data.days[i].datetime;
      div.innerText = new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
      });

      div.style.width = "80px";
      img.src = `./icons/${data.days[i].icon}.png`;
      tempDiv.textContent = `${Math.round(data.days[i].tempmin)}° ${Math.round(data.days[i].tempmax)}°`;

      div.append(img, tempDiv);
      daysContainter.appendChild(div);
    }
  } catch (error) {
    console.error(error);
  }
}
