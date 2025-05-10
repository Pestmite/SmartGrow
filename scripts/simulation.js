import { selectPage } from "./general.js";
import { generateForecast } from './overview/forecast.js';
import { setProgress, resetProgress } from "./timing.js";
import { setStage, updateStageText } from "./staging.js";

window.watering = false;
const waterButton = document.querySelector('.water-button');

if (waterButton) {
  waterButton.addEventListener('click', () => {
  resetProgress();
  watering = true;
});
}

selectPage('Simulation');
generateForecast(true);
setProgress();
setStage('sleep');
updateStageText('PowerDown');