import { updateData, generateSelect } from '../data/plants.js';
import { findData, generateChart, intervalOption, updateChartTitle } from './charts.js';
import { setProgress, resetProgress } from './timing.js';

let watering = false;
let savingData = [1, 2];
let labels = ['', ''];

generateChart(savingData, labels);
generateSelect();
updateChartTitle(savingData);
updateData();
intervalOption();

setInterval(() => {
  findData(savingData, labels);
  generateChart(savingData, labels);
  updateChartTitle(savingData);
}, 1000);

if (document.querySelector('.water-button')) {
  document.querySelector('.water-button').addEventListener('click', resetProgress);
}

// setInterval(() => {
//   if (!watering) {
//     setProgress();
//   }
// }, 1000);