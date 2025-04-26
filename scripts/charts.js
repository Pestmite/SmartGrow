const moneySavedChart = document.getElementById('money-saved-chart-js').getContext('2d');
const savingData = [2, 4, 5, 3, 3, 2, 3, 5, 6, 5, 7, 6, 4, 5, 6, 6, 8, 9, 7, 6, 7, 7, 8, 9, 10];
const rising = savingData[0] <= savingData[savingData.length - 1]

const gradient = moneySavedChart.createLinearGradient(0, 0, 0, 400);
let borderColor;
let minChartY = 0;
let maxChartY = Math.max(...savingData) + 5;

if (Math.min(...savingData) - 5 >= 0) {
  minChartY = Math.min(...savingData) - 5;
}

if (rising) {
  gradient.addColorStop(0, 'rgba(76, 175, 80, 0.5)');
  gradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
  borderColor = 'rgb(39, 161, 14)';
} else {
  gradient.addColorStop(0, 'rgba(244, 67, 54, 0.5)');
  gradient.addColorStop(1, 'rgba(244, 67, 54, 0)');
  borderColor = 'rgb(234,67,53)';
}

export function generateChart() {
  new Chart(moneySavedChart, {
  type: 'line',
  data: {
    labels: ['', '', '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',],
    datasets: [{
      data: savingData,
      borderColor: borderColor,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 0,
      backgroundColor: gradient,
      fill: true,
    }],
  },
  options: {
    responsive: true,
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

let kilowatts = 3.4;
let dollarsSaved = 0.295 * kilowatts;

export function updateChartTitle() {
  document.querySelector('.watts-saved-js').innerHTML = `${kilowatts}kw &rarr; $${dollarsSaved.toFixed(2)} saved`
}