import { selectPage } from "./general.js";
import { generateForecast } from './overview/forecast.js';
import { setProgress, resetProgress } from "./timing.js";

window.watering = false;

document.querySelector('.water-button').addEventListener('click', () => {
  resetProgress();
  watering = true;
});

function setStage(stage) {
  if (document.querySelector('.current-stage')) {
      document.querySelector('.current-stage').classList.remove('current-stage');
    } else if (document.querySelector('.current-side-stage')) {
      document.querySelector('.current-side-stage').classList.remove('current-side-stage');
  }
  
  let stageIndex = stage === 'sleep' ? 6 : 5;

  document.querySelectorAll('.stage-group')[stageIndex].classList.add('current-stage');
} 

selectPage('Simulation');
generateForecast(true);
setProgress();
setStage('sleep');

setInterval(() => {
  if (!watering) {
    setProgress();
    setStage('sleep');
  } else {
    setStage('water');
  }
}, 1000);