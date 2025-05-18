export const aspects = {
  features: [
    'Built-in plant database containing data for 50+ plants',
    'Real-world weather forecast and soil humidity data',
    '15+ user tunable variables',
    'Machine-learning inpired algorithm for weather analysis'
  ], stack: [
    'Coded in C++ with Arduino',
    'Python Backend with server communication',
    'Website made with HTML, CSS, and JavaScript',
    'Fully 3D-printed protective casing for sprinkler unit'
  ], impact: [
    'Qualified for Montreal Regional Science Fair',
    'Won Concordia Award for Outstanding Achievement in ECE',
    'Under 20$/unit to make in bulk',
    'Received positive feedback and advice',
  ]
}

export function switchSection(tab) {
  document.querySelectorAll('.about-select-js').forEach((link) => {
    link.classList.remove('selected-section')
  });

  tab.classList.add('selected-section');
  generateAspects(tab.id);
}

export function generateAspects(section) {
  let HTML = '';

  aspects[section].forEach((element) => {
    HTML += `<div class="features-group">
      <img src="images/check-list.png" alt="checkbox">
      <p>${element}</p>
    </div>`
  });

  document.querySelector('.aspect-section-js').innerHTML = HTML;
}