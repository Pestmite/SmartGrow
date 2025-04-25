import { updateData, generateSelect } from '../data/plants.js';
import { setProgress, resetProgress } from './timing.js';

let watering = false;
let moneySavedChart = document.getElementById('money-saved-chart-js').getContext('2d');
let chartInfo = new Chart(moneySavedChart, {
  type: 'line',
  data: {
    labels: ['Cheese', 'Carrot', 'Beffle'],
    datasets: [{
      label: 'Foods',
      data: [2, 1, 4],
      borderColor: 'rgb(39, 161, 14)',
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 1,
      fill: false
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
    }
  }
});

generateSelect();
updateData();

document.querySelector('.water-button').addEventListener('click', () => resetProgress());
  
setInterval(() => {
  if (!watering) {
    setProgress();
  }
}, 1000);