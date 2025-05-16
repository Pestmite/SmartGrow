import { generateSelect, updateData } from "../data/plants.js";
import { generateVariables, updateMinutes, generateVariablesValues, setByPlant, resetVariables } from "../data/variables.js";
import { selectPage } from "./general.js";
import { generateForecast, getDailyForecast } from "./specific/forecast.js";

const simpleToggle = document.querySelector('.simple-toggle');
const advancedToggle = document.querySelector('.advanced-toggle');
let advanced = false;

simpleToggle.addEventListener('click', (event) => toggleAdvanced(event, true))
advancedToggle.addEventListener('click', (event) => toggleAdvanced(event, false))

function toggleAdvanced(event, isSimple) {
  document.querySelectorAll('.variable-link-js').forEach((link) => {
    link.classList.remove('selected-variables');
  });
  
  advanced = isSimple ? false : true;
  event.srcElement.classList.add('selected-variables');
  generateVariables(advanced);
  generateVariablesValues();
  document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));
}

selectPage('Customize');
generateVariables(advanced);
generateVariablesValues();
generateSelect();
updateData();
generateForecast();


document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));
const resetButton = document.querySelector('.reset-variables');
const plantButton = document.querySelector('.plant-set-button');

document.getElementById('location').addEventListener('change', getDailyForecast)
plantButton.addEventListener('click', setByPlant);
resetButton.addEventListener('click', () => resetVariables(advanced));