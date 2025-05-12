/*
Type Guide:
  0. Switch
  1. Normal
  2. Set based on plant
  3. To minutes
  4. No buttons
  5. Advance normal
  6. Advanced with extra info
*/

export const defaultVariablesSections = [
  {
    name: 'Consider Weather',
    id: 'considerWeather',
    description: 'Is the weatherScore algorithm used in calculations? Turn off for indoor use.',
    type: 0,
    default: true
  }, {
    name: 'Days Considered',
    id: 'daysConsidered',
    description: 'How many days should be considered for the weather forecast calculation?',
    interval: 1,
    type: 1,
    default: 5
  }, {
    name: 'Minimum Moisture',
    id: 'minMoisture',
    description: 'What is the minimum humidity percentage considered "dry soil"?',
    interval: 5,
    type: 2,
    default: 40
  }, {
    name: 'Block Water Maximum',
    id: 'blockWater',
    description: 'What is the maximum number of days your plants shouldn\'t be watered for? This overrides the weather forecast algorithm and prevents your plants from being underwatered.',
    interval: 1,
    type: 1,
    default: 3
  }, {
    name: 'Watering Time',
    id: 'wateringTime',
    description: 'How many seconds should watering last?',
    interval: 1,
    type: 1,
    default: 15
  }, {
    name: 'Soil Sample Interval',
    id: 'sampleInterval',
    description: 'How many seconds between soil samplings?',
    interval: 5,
    type: 3,
    default: 20
  }, {
    name: 'Chance Considered',
    id: 'chanceConsidered',
    description: 'What is the minimum chance as a percentage considered by the weather forecast algorithm?',
    interval: 5,
    type: 1,
    default: 70
  }, {
    name: 'Number of Sprinklers',
    id: 'pumpCount',
    description: 'How many sprinkler\'s does the system use? Used by website to calculate electricity saved.',
    interval: 1,
    type: 1,
    default: 1
  }, {
    name: 'Your Location',
    id: 'location',
    description: 'Needed to make an accurate weather forecast. Must be spelled properly, not case sensitive.',
    type: 4,
    default: 'Montreal'
  }, {
    name: 'Forecast Reading Interval',
    id: 'forecastInterval',
    description: 'How many seconds between weather forecast readings?',
    interval: 1200,
    type: 3,
    default: 7200
  }, {
    name: 'Calibrate Serial Monitor',
    id: 'calibrateSerial',
    description: 'How many milliseconds before turning on the serial monitor?',
    interval: 50,
    type: 5,
    default: 100
  }, {
    name: 'Calibrate Humidity Sensor',
    id: 'calibrateSensor',
    description: 'How many milliseconds before turning on the soil moisture sensor?',
    interval: 50,
    type: 5,
    default: 100
  }, {
    name: 'Serial Delay',
    id: 'serialDelay',
    description: 'How many milliseconds before replying to python?',
    interval: 500,
    type: 5,
    default: 3000
  }, {
    name: 'Light rain',
    id: 'lightRain',
    description: 'How many millimeters of water is considered the maximum for light rain?',
    interval: 0.5,
    type: 5,
    default: 2.5
  }, {
    name: 'Moderate Rain',
    id: 'moderateRain',
    description: 'How many millimeters of water is considered the maximum for moderate rain?',
    interval: 1,
    type: 5,
    default: 5
  }, {
    name: 'Small Boost',
    id: 'smallBoost',
    description: 'What should the reward for light rain be?',
    interval: 10,
    type: 6,
    default: 50
  }, {
    name: 'Medium Boost',
    id: 'mediumBoost',
    description: 'What should the reward for moderate rain be?',
    interval: 20,
    type: 6,
    default: 100
  }, {
    name: 'Large Boost',
    id: 'largeBoost',
    description: 'What should the reward for heavy rain be?',
    interval: 50,
    type: 6,
    default: 200
  }
];

let plantMoisture = JSON.parse(localStorage.getItem('plantMoisture')) || 60;
let selectedPlant = JSON.parse(localStorage.getItem('selectedPlant')) || 'Tomato';

export let variables = JSON.parse(localStorage.getItem('variables')) || defaultVariablesSections;

export let defaultVariables = [];
variables.forEach((variable) => {
  defaultVariables.push(variable.default);
});

export function storeVariables() {
  localStorage.setItem('variables', JSON.stringify(variables));
};

export function resetVariables(advanced) {
  variables = JSON.parse(JSON.stringify(defaultVariablesSections));
  storeVariables();
  generateVariables(advanced);
  document.querySelectorAll('.to-minutes').forEach((variable) => updateMinutes(variable.parentElement));
};

export function generateVariables(toggleAdvanced) {
  let variablesText = '';
  let inputText = '';
  let extraInfo;
  let moreInfo;
  document.querySelector('.simple-variables').innerHTML = '';
  document.querySelector('.advanced-variables').innerHTML = '';

  variables.forEach((variable => {
    extraInfo = '';
    moreInfo = '';
    if (variable.type) {
      if (variable.type === 6) {
        extraInfo = `<div class="info-group">
            <img src="images/info.png" class="info-icon" alt="info-icon">
            <div class="tag">Machine-learning inspired reward, 100 points is equivalent to 1 day without rain.</div>
          </div>`;
        moreInfo = '<div class="small-screen-info">Machine-learning inspired reward, 100 points is equivalent to 1 day without rain.</div>'
      } else if (variable.type === 2) {
        extraInfo = `<input type="button" value="Set Based On Plant" class="plant-set-button" id="plant-set">`
      } else if (variable.type === 3) {
        extraInfo = `<div class="to-minutes"></div>`;
      }

      if (variable.type === 4) {
        inputText = `<input type="text" value="${variable.default}" id="${variable.id}" class="input-variable city">`;
      } else {
        inputText = `<input type="button" value="-" class="button-variable">
          <input type="text" value="${variable.default}" id="${variable.id}" class="input-variable">
          <input type="button" value="+" class="button-variable">
          ${extraInfo}`
      };
      
      variablesText = `<div class="variable">
        <h4 class="variable-name">${variable.name}</h4>
        <div class="customize-variable">
          <div class="variable-buttons">
            ${inputText}
          </div>
          <p class="variable-description">${variable.description}</p>
          ${moreInfo}
        </div>
      </div>`
    } else {
      let toggleOn = variable.default ? 'checked' : '';
      variablesText = `<div class="weather-switch-container">
          <h4 class="variable-name">${variable.name}</h4>
          <label for="toggle-weather" class="weather-switch">
            <input type="checkbox" id="toggle-weather" ${toggleOn}>
            <span class="slider"></span>
          </label>
          <p>${variable.description}</p>
        </div>`
    }

    if (variable.type < 5) {
      document.querySelector('.simple-variables').innerHTML += variablesText;
    } else {
      document.querySelector('.advanced-variables').innerHTML += variablesText;
    };
  }));

  const variableButton = document.querySelectorAll('.button-variable');
  const variablesValue = document.querySelectorAll('.input-variable');
  const toggleWeather = document.querySelector('#toggle-weather');

  variableButton.forEach((button) => updateInput(button, 'click'));
  variablesValue.forEach((box) => updateInput(box, 'change'));
  toggleWeather.addEventListener('change', () => {
    variables[0].default = toggleWeather.checked;
    store();
  });

  if (toggleAdvanced) {
    document.querySelector('.simple-variables').innerHTML = '';
  } else {
    document.querySelector('.advanced-variables').innerHTML = '';
  };
}

export function setByPlant() {
  plantMoisture = JSON.parse(localStorage.getItem('plantMoisture'));
  selectedPlant = JSON.parse(localStorage.getItem('selectedPlant'));

  document.getElementById('minMoisture').value = plantMoisture;
  variables[2].default = plantMoisture;
  localStorage.setItem('plantMoisture', JSON.stringify(plantMoisture));
  localStorage.setItem('selectedPlant', JSON.stringify(selectedPlant));

  storeVariables();
};

function updateInput(item, eventListener) {
  item.addEventListener(eventListener, () => {
    const customizeVariable = item.parentElement;
    const singleInputBox = customizeVariable.querySelector('.input-variable');
    const variable = variables.find(v => v.id === singleInputBox.id);

    if (item.value === '+') {
      singleInputBox.value = Math.max((parseFloat(singleInputBox.value) + variable.interval), 0);
    } else if (item.value === '-') {
      singleInputBox.value = Math.max((parseFloat(singleInputBox.value) - variable.interval), 0);
    }

    updateMinutes(customizeVariable);
    store();
  });
};

function store() {
  const variablesValue = document.querySelectorAll('.input-variable');
  variablesValue.forEach((variableValue) => {
    const targetVariable = variables.find(v => v.id === variableValue.id);

    if (variableValue.id !== 'location') {
      targetVariable.default = parseFloat(variableValue.value);
    } else {
      targetVariable.default = variableValue.value
    }
  });

  if (document.querySelector('#toggle-weather')) {
    variables[0].default = document.querySelector('#toggle-weather').checked;
  }
  
  storeVariables();
};

export function updateMinutes(customizeVariable) {
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

let variablesValue = document.querySelectorAll('.input-variable');

export function generateVariablesValues() {
  variablesValue.forEach((variableValue, index) => {
    if (Object.values(defaultVariables)[index] !== undefined) {
      variableValue.value = Object.values(defaultVariables)[index];
    }
  });
};

export function updateMeters() {
  let soilHumidity = Math.round(JSON.parse(localStorage.getItem('soilHumidity'))) || 82;
  document.querySelector('.humidity-meter').style.setProperty(('--percent'), soilHumidity);
}