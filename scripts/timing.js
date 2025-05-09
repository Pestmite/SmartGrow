import { updateMeters } from "../data/variables.js";

const variables = JSON.parse(localStorage.getItem('variables'));
const progressBar = document.querySelector('.progress-bar');

let totalProgress = variables[4].default;
let progress = 0;
let soilHumidity = 40.58;

export function setProgress() {
  if (progressBar) {
    let percentage = (progress / totalProgress * 100).toFixed()
    progressBar.style.width = `${percentage}%`;
    if (document.querySelector('.time-until-test')) {
      document.querySelector('.time-until-test').innerHTML = `${totalProgress - progress}s`;

    }
    simulateSoil();

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

  if (progress >= totalProgress) {
    if (soilHumidity <= variables[1].default) {
      resetProgress();
    }

    progress = 0;
  } else {
    progress++;
  }
}

export function resetProgress() {
  const debugTitle = document.querySelector('.debug-title');
  if (document.querySelector('.time-until-test') !== null) {
    progress = 0;
    soilHumidity = 82.43;
    setProgress();
    debugTitle.innerHTML = `WATERING FOR ${variables[3].default} SECONDS`;
    progressBar.style.width = `100%`;
    window.watering = true;

    setTimeout(() => {
      window.watering = false;
      debugTitle.innerHTML = `Soil tested in: <span class="time-until-test">${totalProgress - progress}s</span>`;
    }, variables[3].default * 1000);
  };
}

function simulateSoil() {
  soilHumidity = soilHumidity.toFixed(2)

  if (document.querySelector('.soil-humidity')) {
    document.querySelector('.soil-humidity').innerHTML = soilHumidity;
  }

  soilHumidity = Math.max(soilHumidity - 0.35, 0);
  localStorage.setItem('soilHumidity', JSON.stringify(soilHumidity))
}