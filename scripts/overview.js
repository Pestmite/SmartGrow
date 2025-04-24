import { updateData } from '../data/plants.js';
import { generateSelect } from './general.js';
import { setProgress, resetProgress } from './timing.js';

let watering = false;

document.querySelector('.water-button').addEventListener('click', () => resetProgress());
  
setInterval(() => {
  if (!watering) {
    setProgress();
  }
}, 1000);

generateSelect();
updateData();