import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function updateStageText(stage) {
  const nextStage = stage === 'PowerDown' ? 'Print Debug Menu' : 'PowerDown';
  if (document.querySelector('.update-time-item h2') || document.querySelector('.staging-item h2')) {
    document.querySelectorAll('.stage-name').forEach((item) => {item.innerHTML = stage});
    document.querySelector('.next-stage-name').innerHTML = nextStage;
  }
}

export function changeTime(first=false) {
  if (document.querySelector('.update-time-item h2') || document.querySelector('.staging-item h2')) {
    if (first) {
      document.querySelector('.time-name').innerHTML = dayjs().subtract(20, 'm').format('h:mm A');
    } else {
      document.querySelector('.time-name').innerHTML = dayjs().format('h:mm A');
    }
  }
}

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