import { selectPage } from "./general.js";

document.querySelectorAll('.about-select-js').forEach((tab) => {
  tab.addEventListener('click', () => switchSection(tab))
});

function switchSection(tab) {
  document.querySelectorAll('.about-select-js').forEach((link) => {
    link.classList.remove('selected-section')
  });

  tab.classList.add('selected-section');
}

selectPage('About');


// Coded in C++ with Arduino
// Python Backend with server communication
// Website made with HTML, CSS, and JavaScript
// Fully 3D-printed protective casing for sprinkler unit

// 150+ hours of development
// Won Concordia's Award for Outstanding Achievement in Electrical Engineering and Computer Engineering at the Montreal Regional Science Fair
// Under 20$/unit to make in bulk
// Received positive feedback and advice