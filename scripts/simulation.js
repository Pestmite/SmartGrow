import { selectPage } from "./general.js";
import { generateForecast } from './overview/forecast.js';
import { setProgress, resetProgress } from "./timing.js";

window.watering = false;
const waterButton = document.querySelector('.water-button');

if (waterButton) {
  waterButton.addEventListener('click', () => {
  resetProgress();
  watering = true;
});
}

export function setStage(stage) {
  if (document.querySelector('.stage-group')) {
    if (document.querySelector('.current-stage')) {
    document.querySelector('.current-stage').classList.remove('current-stage');

  } else if (document.querySelector('.current-side-stage')) {
    document.querySelector('.current-side-stage').classList.remove('current-side-stage');
  }
  
  let stageIndex = stage === 'sleep' ? 6 : 5;

  document.querySelectorAll('.stage-group')[stageIndex].classList.add('current-stage');
  }
} 

selectPage('Simulation');
generateForecast(true);
setProgress();
setStage('sleep');