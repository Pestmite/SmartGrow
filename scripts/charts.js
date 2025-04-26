let newMoneyChart;

export function generateChart(savingData, labels) {
  let visibleSavingData = savingData.slice(-20);
  let visibleLabels = labels.slice(-20);
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
  let minChartY = Math.max(0, (Math.min(...visibleSavingData) - 5));
  let maxChartY = Math.max(...visibleSavingData) + 5;
  
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
        return context.dataIndex === context.chart.data.datasets[0].data.length - 1 ? 4 : 1;
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
  while (randomNumber < 0.25 || randomNumber > 0.8) {
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

export function intervalOption() {
  const intervalOptions = document.querySelectorAll('.interval-option');
  intervalOptions.forEach((option) => {
    console.log(option)
    option.addEventListener('click', () => selectIntervalOption(option));
  });
}

function selectIntervalOption(selectedOption) {
  document.querySelector('.selected-interval').classList.remove('selected-interval');
  selectedOption.classList.add('selected-interval');
}