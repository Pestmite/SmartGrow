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

  let temperatureFinal = [];
  let chanceFinal = [];
  let iconFinal = [];
  let precipFinal = [];
  let forecastsPerDay = temperatureList.length / 5;
  for (let i = 1; i <= temperatureList.length / forecastsPerDay; i++) {

    let temperature = [];
    let chance = [];
    let icon;
    let precip = [];
    for (let j = i; j <= forecastsPerDay + i - 1; j++) {
      let index = i * forecastsPerDay - forecastsPerDay + j - i;
      temperature.push(forecast.list[index].main.temp);
      chance.push(forecast.list[index].pop);
      precip.push(forecast.list[index].rain?.['3h']);
      if (j === 5) { icon = forecast.list[index].weather[0].icon };
    }

    temperatureFinal.push(Math.max(...temperature));
    chanceFinal.push(Math.max(...chance));
    iconFinal.push(icon);

    let sum = 0;
    precip.forEach(item => { sum = item !== undefined ? sum + item : sum });
    precipFinal.push(Math.round(sum));
  }
}