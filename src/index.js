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
  } catch (error) {
    console.error(error);
  }
}

//   getWeather(location);
// });
// buttonF.addEventListener("click", () => setUnit("°F"));
// buttonC.addEventListener("click", () => setUnit("°C"));

// async function getWeather(location) {
//   try {
//     const KEY = "E3VBXLTQ9CYL8XZ4SZFDXENYQ";
//     let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}`;
//     const response = await fetch(API);
//     const data = await response.json();

//     const h2 = document.querySelector("h2");
//     const temp = document.querySelector("p[temp]");
//     const condition = document.querySelector("p[condition]");

//     ((h2.textContent = data.address),
//       (temp.textContent = `${data.days[0].temp}`),
//       (condition.textContent = data.days[0].conditions));

//     console.log(data);

//     const localTime = new Intl.DateTimeFormat("en-US", {
//       timeZone: data.timezone,
//       dateStyle: "medium",
//       timeStyle: "short",
//     }).format(new Date());

//     console.log(localTime);

//     document.querySelector("input").value = "";
//     if (!buttonF.classList.contains("active"))
//       buttonF.classList.toggle("active");
//     if (buttonC.classList.contains("active"))
//       buttonC.classList.toggle("active");
//     document.querySelector("span").textContent = "°F";
//   } catch (error) {
//     console.log(error);
//     alert("Please enter a valid city or country");
//   }
// }

// function setUnit(targetUnit) {
//   let tempSpan = document.querySelector("span");

//   // Only convert if we are clicking the unit we aren't currently on
//   if (tempSpan.textContent !== targetUnit) {
//     let temp = document.querySelector("p[temp]");
//     let currentTemp = +temp.textContent;

//     let result =
//       targetUnit === "°F"
//         ? convertToFahrenheit(currentTemp)
//         : convertToCelsius(currentTemp);

//     temp.textContent = result.toFixed(1);
//     tempSpan.textContent = targetUnit;

//     // Toggle active classes based on target unit
//     buttonF.classList.toggle("active", targetUnit === "°F");
//     buttonC.classList.toggle("active", targetUnit === "°C");
//   }
// }

// function convertToCelsius(temp) {
//   return (temp - 32) / 1.8;
// }

// function convertToFahrenheit(temp) {
//   return temp * 1.8 + 32;
// }

// getWeather("las vegas");
