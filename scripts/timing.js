import { plants } from '../data/plants.js';

const variables = JSON.parse(localStorage.getItem('variables'));
const humidityText = document.querySelector('.soil-humidity');
const progressBar = document.querySelector('.progress-bar');
const lastWatering = document.querySelector('.last-watering');
const waterButton = document.querySelector('.water-button');
const debugTitle = document.querySelector('.debug-title');
const savedWateringTime = variables.wateringTime;
const savedMinMoisture = variables.plantMoisture;
let totalProgress = variables.sampleInterval;

let watering = false;
let progress = 0;
let soilHumidity = 40.58;

waterButton.addEventListener('click', () => resetProgress())

function setProgress() {
  let percentage = (progress / totalProgress * 100).toFixed()
  progressBar.style.width = `${percentage}%`;
  document.querySelector('.time-until-test').innerHTML = `${totalProgress - progress}s`;

  simulateSoil()

  if (progress < 60) {
    lastWatering.innerHTML = `${progress} seconds`
  } else if (progress < 3600) {
    lastWatering.innerHTML = `${Math.floor(progress / 60)} minutes`
  } else {
    const hours = Math.floor(progress / 3600);
    const minutes = Math.floor((progress % 3600) / 60);
    lastWatering.innerHTML = `${hours}h ${minutes}m ago`;
  }

  if (progress >= totalProgress) {
    if (soilHumidity <= savedMinMoisture) {
      resetProgress();
    }

    progress = 0;
  } else {
    progress++;
  }
}

function resetProgress() {
  if (document.querySelector('.time-until-test') !== null) {
      progress = 0;
    soilHumidity = 82.43;
    setProgress();
    debugTitle.innerHTML = `WATERING FOR ${savedWateringTime} SECONDS`;
    watering = true;
    progressBar.style.width = `100%`;

    setTimeout(() => {
      watering = false;
      debugTitle.innerHTML = `Soil tested in: <span class="time-until-test">${totalProgress - progress}s</span>`;

    }, savedWateringTime * 1000);
  };
}

function simulateSoil() {
  soilHumidity = soilHumidity.toFixed(2)
  humidityText.innerHTML = soilHumidity;
  soilHumidity = Math.max(soilHumidity - 0.35, 0);
}

setProgress();

setInterval(() => {
  if (!watering) {
    setProgress();
  }
}, 1000);
