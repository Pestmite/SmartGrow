let newMoneyChart;

export function generateChart(savingData, labels, interval) {
  let visibleSavingData = interval ? savingData.slice(0 - interval) : savingData;
  let visibleLabels = interval ? labels.slice(0 - interval) : labels;
  let moneySavedChart = '';
  if (window.innerWidth <= 500) {
    moneySavedChart = document.getElementById('mobile-chart-js').getContext('2d');
  } else {
    moneySavedChart = document.getElementById('money-saved-chart-js').getContext('2d');;
  }

  if (newMoneyChart) {
    newMoneyChart.destroy();
  }

  const rising = visibleSavingData[0] <= savingData[savingData.length - 1];
  let gradient = moneySavedChart.createLinearGradient(0, 0, 0, 400);
  let borderColor;

  if (rising) {
    gradient.addColorStop(0, 'rgba(76, 175, 80, 0.5)');
    gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
    borderColor = 'rgb(39, 161, 14)';
  } else {
    gradient.addColorStop(0, 'rgba(244, 67, 54, 0.5)');
    gradient.addColorStop(1, 'rgba(244, 67, 54, 0)');
    borderColor = 'rgb(234,67,53)';
  }
  let minChartY = Math.min((Math.min(...visibleSavingData) - 5), (Math.floor(Math.min(...visibleSavingData) - Math.min(...visibleSavingData) * 0.1)));
  minChartY = Math.max(0, minChartY);
  let maxChartY = Math.max((Math.max(...visibleSavingData) + 5), (Math.floor(Math.max(...visibleSavingData) * 1.1)));
  
  newMoneyChart = new Chart(moneySavedChart, {
  type: 'line',
  data: {
    labels: visibleLabels,
    datasets: [{
      data: visibleSavingData,
      borderColor: borderColor,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: function(context) {
        return context.dataIndex === context.chart.data.datasets[0].data.length - 1 ? 4 : 0;
      },
      backgroundColor: gradient,
      fill: true,
    }],
  },
  options: {
    responsive: false,
    animation: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    interaction: {
      mode: null
    },
    scales: {
      y: {
        min: minChartY,
        max: maxChartY
      }
    }
  }
  });
}

export function findData(savingData, labels) {
  let randomNumber = Math.random();
  while (randomNumber < 0.34 || randomNumber > 0.68) {
    randomNumber = Math.random();
  }
  let dataPoint = Math.round(randomNumber * 2 * savingData[savingData.length - 1] + 1);
  savingData.push(dataPoint);
  labels.push('');
}

export function updateChartTitle(savingData) {
  let kilowatts = savingData[savingData.length - 1];
  let dollarsSaved = 0.295 * kilowatts;
  document.querySelector('.watts-saved-js').innerHTML = `${kilowatts}kw &rarr; $${dollarsSaved.toFixed(2)} saved`
}

export let timeInterval = document.querySelector('.selected-interval').value;

export function intervalOption(savingData, labels, timeInterval) {
  const intervalOptions = document.querySelectorAll('.interval-option');
  intervalOptions.forEach((option) => {
    option.addEventListener('click', () => {
      selectIntervalOption(option);
      generateChart(savingData, labels, timeInterval);
    });
  });
}

function selectIntervalOption(selectedOption) {
  document.querySelector('.selected-interval').classList.remove('selected-interval');
  selectedOption.classList.add('selected-interval');
  timeInterval = document.querySelector('.selected-interval').value;
}