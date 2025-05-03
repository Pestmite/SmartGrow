import { generateVariables, updateMinutes, generateVariablesValues, variables } from "../data/variables.js";
import { selectPage } from "./general.js";

const simpleToggle = document.querySelector('.simple-toggle');
const advancedToggle = document.querySelector('.advanced-toggle');
let advanced = false

simpleToggle.addEventListener('click', (event) => toggleAdvanced(event))
advancedToggle.addEventListener('click', (event) => toggleAdvanced(event))

function toggleAdvanced(event) {
  if (event.srcElement.classList.contains('advanced-toggle')) {
    advanced = true;
  } else {
    advanced = false;
  }

  document.querySelectorAll('.variable-link-js').forEach((link) => {
    link.classList.remove('selected-variables')});
  event.srcElement.classList.add('selected-variables');
  generateVariables(advanced);
  generateVariablesValues();
  document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));
}

selectPage('Customize');
generateVariables(advanced);
generateVariablesValues();
document.querySelectorAll('.input-variable').forEach((box) => updateMinutes(box.parentElement));