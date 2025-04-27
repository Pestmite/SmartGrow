import { updateData, generateSelect } from '../data/plants.js';
import { findData, generateChart, intervalOption, updateChartTitle, timeInterval } from './overview/charts.js';

let watering = false;
let savingData = [1, 2, 2, 3, 2, 4, 5];
let labels = ['', '', '', '', '', '', ''];

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