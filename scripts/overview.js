import { updateData, generateSelect } from '../data/plants.js';
import { findData, generateChart, intervalOption, updateChartTitle, timeInterval, resetChart } from './overview/charts.js';
import { generateForecast } from './overview/forecast.js';

let watering = false;
let savingData = [1, 2, 2, 3, 2, 4, 5];
let labels = ['', '', '', '', '', '', ''];
if (localStorage.getItem('savingData')) {
  savingData = JSON.parse(localStorage.getItem('savingData'));
  labels = JSON.parse(localStorage.getItem('labels'));
}

generateForecast();
generateChart(savingData, labels, timeInterval);
generateSelect();
updateChartTitle(savingData);
updateData();
intervalOption(savingData, labels, timeInterval);

setInterval(() => {
  findData(savingData, labels);
  generateChart(savingData, labels, timeInterval);
  updateChartTitle(savingData);
}, 1000);

window.addEventListener('resize', () => generateChart(savingData, labels, timeInterval))