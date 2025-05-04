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
  if (!large) {
    forecast = 'small-forecast';
  } else {
    forecast = 'large-forecast';
  }

  let HTML = '';
  forecastDays.forEach((day) => {
    HTML += ` <div class="daily-forecast ${forecast}">
          <img src="images/weather/${day.image}.png">
          <div class="forecast-text">
            <h2>Monday - 18°C</h2>
            <p>0 mm</p>
          </div>
        </div>`
  });

  document.querySelector('.forecast-item-js').innerHTML += HTML;
}