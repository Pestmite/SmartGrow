import { variableMap } from "../../data/variables.js";

const APIKey = '099e14cce42304e08ad466e59a36c706';
const city = variableMap['location'].default;

export function generateForecast(large = false) {
  getDailyForecast();
  const forecastDays = [
    {
      image: 'cloudy',
    }, {
      image: 'sun',
    }, {
      image: 'sun',
    }, {
      image: 'rain',
    }, {
      image: 'thunder',
    }
  ];

  let forecast;
  let temp;
  if (!large) {
    forecast = 'small-forecast';
    temp = `18°C`
  } else {
    forecast = 'large-forecast';
  }

  let HTML = '';
  forecastDays.forEach((day) => {
    HTML += `<div class="daily-forecast ${forecast}">
          <img src="images/weather/${day.image}.png" alt="${day.image}-icon">
          <div class="forecast-text">
            <h2><span class="extra-forecast">Monday - </span>18°C</h2>
            <p><span class="extra-forecast">20% chance of </span>2 mm</p>
          </div>
        </div>`
  });

  if (document.querySelector('.forecast-item-js')) {
    document.querySelector('.forecast-item-js').innerHTML = HTML;
  }
}

async function getDailyForecast() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`);
  const forecast = await response.json();
  let temperatureList = [];
  let chanceList = [];
  let precipList = [];
  let weatherList = [];
  forecast.list.forEach((item) => {
    temperatureList.push(item.main.temp);
    chanceList.push(item.pop);
    precipList.push(item.rain?.['3h']);
    weatherList.push(item.weather[0].icon);
  });

  console.log(weatherList);
}