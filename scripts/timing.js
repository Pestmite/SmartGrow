const variables = JSON.parse(localStorage.getItem('variables'));
const progressBar = document.querySelector('.progress-bar');

let totalProgress = variables.sampleInterval;
let progress = 0;
let soilHumidity = 40.58;

export function setProgress() {
  const lastWatering = document.querySelector('.last-watering');
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
    if (soilHumidity <= variables.plantMoisture) {
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
    debugTitle.innerHTML = `WATERING FOR ${variables.wateringTime} SECONDS`;
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
  document.querySelector('.soil-humidity').innerHTML = soilHumidity;
  soilHumidity = Math.max(soilHumidity - 0.35, 0);
}