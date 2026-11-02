import "./style.css";

const button = document.querySelector("button");
const buttonF = document.querySelector("button[farenheit]");
const buttonC = document.querySelector("button[celsius]");

button.addEventListener("click", () => {
  const location = document.querySelector("input").value;
  if (location == "") return;

  getWeather(location);
});
buttonF.addEventListener("click", displayFahrenheit);
buttonC.addEventListener("click", displayCelsius);

async function getWeather(location) {
  try {
    const KEY = "E3VBXLTQ9CYL8XZ4SZFDXENYQ";
    let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${KEY}`;
    const response = await fetch(API);
    const data = await response.json();

    const h2 = document.querySelector("h2");
    const temp = document.querySelector("p[temp]");
    const condition = document.querySelector("p[condition]");

    ((h2.textContent = data.address),
      (temp.textContent = `${data.days[0].temp}`),
      (condition.textContent = data.days[0].conditions));

    console.table(data.days[0]);

    document.querySelector("input").value = "";
    buttonF.classList.toggle("active");
    buttonC.classList.toggle("active");
  } catch (error) {
    console.log(error);
    alert("Please enter a valid city or country");
  }
}

function displayFahrenheit() {
  let tempSpan = document.querySelector("span");
  if (tempSpan.textContent == "°C") {
    let temp = document.querySelector("p[temp]");
    let result = convertToFahrenheit(+temp.textContent);
    temp.textContent = result.toFixed(1);
    tempSpan.textContent = "°F";
    buttonF.classList.toggle("active");
    buttonC.classList.toggle("active");
  }
}

function displayCelsius() {
  let tempSpan = document.querySelector("span");
  if (tempSpan.textContent == "°F") {
    let temp = document.querySelector("p[temp]");
    let result = convertToCelsius(+temp.textContent);
    temp.textContent = result.toFixed(1);
    tempSpan.textContent = "°C";
    buttonF.classList.toggle("active");
    buttonC.classList.toggle("active");
  }
}

function convertToCelsius(temp) {
  return (temp - 32) / 1.8;
}

function convertToFahrenheit(temp) {
  return temp * 1.8 + 32;
}

getWeather("las vegas");
