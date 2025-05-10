import { selectPage } from "./general.js";
import { generateForecast } from './specific/forecast.js';
import { setProgress, resetProgress } from "./specific/timing.js";
import { setStage, updateStageText } from "./specific/staging.js";

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