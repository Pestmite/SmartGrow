import { plants } from '../data/plants.js';

const stringVariables = localStorage.getItem('variables') || JSON.stringify({
  daysConsidered: 5,
  minMoisture: 40,
  blockWater: 3,
  wateringTime: 15,
  sampleInterval: 20,
  chanceConsidered: 70,
  location: 'Montreal',
  forecastInterval: 7200,
  serialCalibrate: 100,
  sensorCalibrate: 100,
  serialDelay: 3000,
  lightRain: 2.5,
  moderateRain: 5,
  smallBoost: 50,
  mediumBoost: 100,
  largeBoost: 200,
  plant: "Tomato",
  plantMoisture: 60,
});

const variables = JSON.parse(stringVariables);
const humidity = document.querySelector('.humidity-js');
const description = document.querySelector('.description');
const learnLink = document.querySelector('.learn-more-js');
const plantSelector = document.querySelector('#plants');

if (plantSelector) {
  plantSelector.addEventListener('change', () => updateData());
}

function generateSelect() {
  plants.forEach((plant) => {
    if (plant.value == variables.plant) {
      document.querySelector('#plants').innerHTML += `<option value="${plant.value}" selected>${plant.value}</option>`
    } else {
      document.querySelector('#plants').innerHTML += `<option value="${plant.value}">${plant.value}</option>`
    }
  })
}

function updateData() {
  plants.forEach((plant) => {
    if (plantSelector.value === plant.value) {
      humidity.innerHTML = plant.humidity;
      description.innerHTML = plant.description;
      learnLink.href = plant.link;
    }
  });

  storePlant();
};

function storePlant() {
  let plantMoisture = 0;
  if ((humidity.innerHTML).substring(1, 2) == '-') {
    plantMoisture = 10;
  } else {
    let lowMoisture = parseInt((humidity.innerHTML).substring(0, 2))
    let highMoisture = parseInt((humidity.innerHTML).substring(3, 5))
    plantMoisture = parseInt((lowMoisture + highMoisture) / 2);
  }
  variables.plantMoisture = parseInt(plantMoisture);
  variables.plant = plantSelector.value;
  localStorage.setItem('variables', JSON.stringify(variables));
}
  
generateSelect();
updateData();