import { selectPage } from "./general.js";
import { generateForecast } from './overview/forecast.js';
import { setProgress, resetProgress } from "./timing.js";

window.watering = false;

document.querySelector('.water-button').addEventListener('click', () => {
  resetProgress();
  watering = true;
});

selectPage('Simulation');
generateForecast(true);
setProgress();

setInterval(() => {
  if (!watering) {
    setProgress();
  }}, 1000);