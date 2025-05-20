import { updateMeters } from "../../data/variables.js";
import { changeTime } from "./staging.js";
import { variableMap } from "../../data/variables.js";

const progressBar = document.querySelector('.progress-bar');

let totalProgress = variableMap['sampleInterval'].default;
let progress = JSON.parse(localStorage.getItem('progress')) || 0;
let soilHumidity = JSON.parse(localStorage.getItem('soilHumidity')) || 40.58;

// Update progress bar
export function setProgress() {
  if (progressBar) {
    let percentage = (progress / totalProgress * 100).toFixed();
    progressBar.style.width = `${percentage}%`;
    if (document.querySelector('.time-until-test')) {
      document.querySelector('.time-until-test').innerHTML = `${totalProgress - progress}s`;
    }

    const lastWatering = document.querySelector('.last-watering');
    if (progress < 60) {
      lastWatering.innerHTML = `${progress} seconds`
    } else if (progress < 3600) {
      lastWatering.innerHTML = `${Math.floor(progress / 60)} minutes`
    } else {
      const hours = Math.floor(progress / 3600);
      const minutes = Math.floor((progress % 3600) / 60);
      lastWatering.innerHTML = `${hours}h ${minutes}m ago`;
    }
  }

  simulateSoil();
  if (progress >= totalProgress) {
    if (soilHumidity <= variableMap['minMoisture'].default) {
      resetProgress();
    }

    progress = 0;
  } else {
    progress++;
  }

  if (document.querySelector('.humidity-meter')) {
    updateMeters();
  }

  localStorage.setItem('progress', JSON.stringify(progress));
}

// Update asssociated data
export function resetProgress() {
  progress = 0;
  soilHumidity = 82.43;
  changeTime();
  setProgress();
  window.watering = true;

  const debugTitle = document.querySelector('.debug-title');
  if (document.querySelector('.time-until-test') !== null) {
    debugTitle.innerHTML = `WATERING FOR ${variableMap['wateringTime'].default} SECONDS`;
    progressBar.style.width = `100%`;
  };

  setTimeout(() => {
    window.watering = false;
    if (debugTitle) {
      debugTitle.innerHTML = `Soil tested in: <span class="time-until-test">${totalProgress - progress}s</span>`;
    }
  }, variableMap['wateringTime'].default * 1000);
}

// Reset progress bar and associated data
function simulateSoil() {
  if (document.querySelector('.soil-humidity')) {
    document.querySelector('.soil-humidity').innerHTML = soilHumidity;
  }

  soilHumidity = (Math.max(soilHumidity - 0.35, 0)).toFixed(2);
  localStorage.setItem('soilHumidity', JSON.stringify(soilHumidity))
}