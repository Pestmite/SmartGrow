import { updateData, generateSelect } from '../data/plants.js';
import { generateChart, updateChartTitle } from './charts.js';
import { setProgress, resetProgress } from './timing.js';

let watering = false;

generateChart();
updateChartTitle();
generateSelect();
updateData();

document.querySelector('.water-button').addEventListener('click', () => resetProgress());
  
setInterval(() => {
  if (!watering) {
    setProgress();
  }
}, 1000);