import "./style.css";

const button = document.querySelector("button");
const input = document.querySelector("input");
const h2 = document.querySelector("h2");
const pCondition = document.querySelector("p[condition]");
const pTemp = document.querySelector("p[temp]");
const checkBox = document.querySelector('input[type="checkbox"');

button.addEventListener("click", getInput);
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    console.log(`checked`);
    console.log(pTemp.textContent);
    const array = pTemp.textContent.split(" ");
  } else {
    console.log(`not checked`);
    console.log(pTemp.textContent);
    const array = pTemp.textContent.split(" ");
  }
});

async function getInput() {
  const inputValue = input.value || `las vegas`;
  let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?key=E3VBXLTQ9CYL8XZ4SZFDXENYQ`;
  try {
    const response = await fetch(API);
    const data = await response.json();

    h2.textContent = data.address;
    pTemp.textContent = `${data.days[0].temp} °F`;
    pCondition.textContent = data.days[0].conditions;

    console.log(data.days[0]);
  } catch (error) {
    console.error(error);
  }
}

let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=E3VBXLTQ9CYL8XZ4SZFDXENYQ`;

//data.days[0].conditions, data.days[0].temp F, data.days[0].tempmin F, data.days[0].tempmax F
