let variables = JSON.parse(localStorage.getItem('variables'));
const plantSet = document.getElementById('minMoisture');
const plantButton = document.querySelector('.plant-set-button');
const resetButton = document.querySelector('.reset-variables');
const savedPlantMoisture = variables.plantMoisture;
const advancedCustom = document.querySelector('.advanced-button-js');
const variableButton = document.querySelectorAll('.button-variable');
const inputBox = document.querySelectorAll('.input-variable');
const variablesValue = document.querySelectorAll('.input-variable');
let showAdvanced = 0;

plantButton.addEventListener('click', () => setByPlant());
resetButton.addEventListener('click', () => resetVariables());
variableButton.forEach((button) => updateInput(button, 'click'));
inputBox.forEach((box) => updateInput(box, 'change'));

if (advancedCustom) {
  advancedCustom.addEventListener('click', () => toggleAdvanced());
}

function setByPlant() {
  plantSet.value = savedPlantMoisture;
  variables.minMoisture = savedPlantMoisture;
  localStorage.setItem('variables', JSON.stringify(variables));
}

function resetVariables() {
  variables = {
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
  }
  localStorage.setItem('variables', JSON.stringify(variables));
  generateVariables();
};

function generateVariables() {
  variablesValue.forEach((variableValue, index) => {
    if (Object.values(variables)[index] !== undefined) {
      variableValue.value = Object.values(variables)[index];
    }
  });
};

function updateInput(item, eventListener) {
  item.addEventListener(eventListener, () => {
    const customizeVariable = item.parentElement;
    const singleInputBox = customizeVariable.querySelector('.input-variable');

    if (item.value === '+') {
      singleInputBox.value++;
    } else if (item.value === '-') {
      singleInputBox.value--;
    }

    updateMinutes(customizeVariable);
    store();
  });
}

function updateMinutes(customizeVariable) {
  const changedUnits = customizeVariable.querySelector('.to-minutes');
  const singleInputBox = customizeVariable.querySelector('.input-variable');
  let convertedString = '';
  
  if (changedUnits != null) {
    const seconds = parseInt(singleInputBox.value);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    convertedString = h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
    changedUnits.innerHTML = convertedString;
  }
}

function store() {
  variablesValue.forEach((variableValue) => {
    if (variableValue.id !== 'location') {
      variables[variableValue.id] = parseInt(variableValue.value);
    } else {
      variables[variableValue.id] = variableValue.value
    };
  });
  localStorage.setItem('variables', JSON.stringify(variables));
}

function toggleAdvanced() {
  showAdvanced = 1 - showAdvanced;
  if (showAdvanced === 1) {
    document.querySelector('.advanced-variables').classList.add('advanced-variables-show');
    document.querySelector('.advanced-button-js').innerHTML = 'Advanced Customization <img class="arrow" src="images/down.png">';
  } else {
    document.querySelector('.advanced-variables').classList.remove('advanced-variables-show');
    document.querySelector('.advanced-button-js').innerHTML = 'Advanced Customization <img class="arrow" src="images/right.png">';
  }
}

generateVariables();
inputBox.forEach((box) => updateMinutes(box.parentElement));