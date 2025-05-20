import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Update all instances of the current stage
export function updateStageText(stage) {
  const nextStage = stage === 'PowerDown' ? 'Print Debug Menu' : 'PowerDown';
  if (document.querySelector('.update-time-item h2') || document.querySelector('.staging-item h2')) {
    document.querySelectorAll('.stage-name').forEach((item) => {item.innerHTML = stage});
    document.querySelector('.next-stage-name').innerHTML = nextStage;
  }
}

// Update all instances of the time
export function changeTime() {
  let lastWateredData = JSON.parse(localStorage.getItem('firstTime')) || dayjs().subtract(20, 'm').format('h:mm A');
  if (document.querySelector('.update-time-item h2') || document.querySelector('.staging-item h2')) {
    document.querySelectorAll('.time-name').forEach((item) => {item.innerHTML = lastWateredData});
    localStorage.setItem('firstTime', JSON.stringify(dayjs().format('h:mm A')));
  }
}

// Change current stage
export function setStage(stage) {
  if (document.querySelector('.stage-group')) {
    if (document.querySelector('.current-stage')) {
    document.querySelector('.current-stage').classList.remove('current-stage');

  } else if (document.querySelector('.current-side-stage')) {
    document.querySelector('.current-side-stage').classList.remove('current-side-stage');
  }
  
  let stageIndex = stage === 'sleep' ? 6 : 5;

  document.querySelectorAll('.stage-group')[stageIndex].classList.add('current-stage');
  }
}