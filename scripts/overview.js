import { updateData, generateSelect } from '../data/plants.js';
import { setProgress, resetProgress } from './timing.js';

let watering = false;

generateSelect();
updateData();

document.querySelector('.water-button').addEventListener('click', () => resetProgress());
  
setInterval(() => {
  if (!watering) {
    setProgress();
  }
}, 1000);