import { updateMeters, variableMap } from "../../data/variables.js";
import { updateMinutes } from "../../data/variables.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const forecastDays = [{}, {}, {}, {}, {}];

// Generate DOM elements for daily forecast
export async function generateForecast(large = false) {
  await getDailyForecast();
  let forecast = !large ? 'small-forecast' : 'large-forecast';

  let outerHTML = `<h2>5-day Forecast (${variableMap['location'].default.toUpperCase()})</h2>
                  <div class="inner-forecast"></div>`;
  let innerHTML = '';
  forecastDays.forEach((day, index) => {
    innerHTML += `<div class="daily-forecast ${forecast}">
          <img src="https://openweathermap.org/img/wn/${day.icon.substring(0, 2)}d@2x.png" alt="${day.icon}-icon">
          <div class="forecast-text">
            <h2><span class="extra-forecast">${dayjs().add(index, 'd').format('dddd')} &#183; </span>${day.temp}°C</h2>
            <p><span class="extra-forecast">${Math.round(day.chance*100)}% chance of </span>${day.precip} mm</p>
          </div>
        </div>`
  });

  if (document.querySelector('.forecast-item-js')) {
    document.querySelector('.forecast-item-js').innerHTML = outerHTML;
    document.querySelector('.inner-forecast').innerHTML = innerHTML;
  }

  const weatherScore = findWeatherScore();
  updateWeatherScore(weatherScore);
}

// Use openWeatherMap to get daily forecast
export async function getDailyForecast() {
  const APIKey = '099e14cce42304e08ad466e59a36c706';
  let city = variableMap['location'].default;
  let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`);
  if (!response.ok) {
    city = 'Montreal';
    variableMap['location'].default = 'Montreal';
    if (document.querySelector('.variable-item')) {
      document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));
      document.getElementById('location').value = 'Montreal';
    }
    response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`);
  }
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

    temperatureFinal.push(Math.round(Math.max(...temperature)));
    chanceFinal.push(Math.max(...chance));
    iconFinal.push(icon);

    let sum = 0;
    precip.forEach(item => { sum = item !== undefined ? sum + item : sum });
    precipFinal.push(Math.round(sum));
  }

  forecastDays.forEach((day, index) => {
    day['temp'] = temperatureFinal[index];
    day['precip'] = precipFinal[index];
    day['chance'] = chanceFinal[index];
    day['icon'] = iconFinal[index];
  });
}

// Use forecast to find weatherScore
function findWeatherScore() {
  let weatherScore = 0;
  forecastDays.forEach(day => {
    if ((day.chance*100) >= variableMap['chanceConsidered'].default) {
      if (day.precip >= variableMap['moderateRain'].default) {
        weatherScore += variableMap['largeBoost'].default;
      } else if (day.precip >= variableMap['lightRain'].default) {
        weatherScore += variableMap['mediumBoost'].default;
      } else if (day.precip >= 0) {
        weatherScore += variableMap['smallBoost'].default;
      }
    }
  });

  return weatherScore;
}

// Update all instances of weatherScore
function updateWeatherScore(weatherScore) {
  if (document.querySelector('.weatherscore')) {
    document.querySelector('.weatherscore').innerHTML = weatherScore;
  }

  if (document.querySelector('.weatherscore-meter')) {
    updateMeters(weatherScore);
  }
}