import { generateVariables, updateMinutes, generateVariablesValues } from "../data/variables.js";
import { selectPage } from "./general.js";

const advancedCustom = document.querySelector('.advanced-button-js');
let showAdvanced = 0;

if (advancedCustom) {
  advancedCustom.addEventListener('click', () => toggleAdvanced());
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

selectPage('Customize');
generateVariables();
generateVariablesValues();
document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));