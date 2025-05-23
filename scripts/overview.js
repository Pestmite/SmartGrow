import { updateData, generateSelect } from '../data/plants.js';
import { selectPage } from './general.js';
import { findData, generateChart, intervalOption, updateChartTitle, timeInterval, resetChart } from './specific/charts.js';
import { generateForecast } from './specific/forecast.js';
import { updateStageText } from './specific/staging.js';

let savingData = [1, 2, 2, 3, 2, 4, 5];
let labels = ['', '', '', '', '', '', ''];
if (localStorage.getItem('savingData')) {
  savingData = JSON.parse(localStorage.getItem('savingData'));
  labels = JSON.parse(localStorage.getItem('labels'));
}

// Make overview items links to other pages
function addLinks() {
  document.querySelector('.about-project-item').addEventListener('click', () => { window.location = 'about.html' });
  document.querySelector('.forecast-item').addEventListener('click', () => { window.location = 'simulation.html' });
  document.querySelector('.update-time-item').addEventListener('click', () => { window.location = 'simulation.html' });
}

// resetChart(savingData, labels);
selectPage('Overview');
updateStageText('PowerDown');
generateForecast();
generateChart(savingData, labels, timeInterval);
generateSelect();
updateChartTitle(savingData);
updateData();
intervalOption(savingData, labels, timeInterval);
addLinks();

setInterval(() => {
  findData(savingData, labels);
  generateChart(savingData, labels, timeInterval);
  updateChartTitle(savingData);
}, 1000);

window.addEventListener('resize', () => {
  generateChart(savingData, labels, timeInterval);
  if (window.innerWidth >= 590 && document.querySelector('body').classList.contains('active')) {
      document.querySelector('body').classList.remove('active');
    }
});