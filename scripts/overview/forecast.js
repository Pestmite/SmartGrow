export function generateForecast(large=false) {
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
          <img src="images/weather/${day.image}.png">
          <div class="forecast-text">
            <h2><span class="extra-forecast">Monday - </span>18°C</h2>
            <p><span class="extra-forecast">20% chance of </span>2 mm</p>
          </div>
        </div>`
  });

  document.querySelector('.forecast-item-js').innerHTML += HTML;
}