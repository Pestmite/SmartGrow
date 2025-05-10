export function updateStageText(stage) {
  const nextStage = stage === 'PowerDown' ? 'Print Debug Menu' : 'PowerDown';
  if (document.querySelector('.update-time-item h2')) {
    document.querySelector('.update-time-item h2').innerHTML = stage;
    document.querySelector('.next-stage-name').innerHTML = nextStage;

  } else if (document.querySelector('.staging-item h2')) {
    document.querySelector('.small-screen h2').innerHTML = stage;
    document.querySelector('.stage-name').innerHTML = stage;
    document.querySelector('.next-stage-name').innerHTML = nextStage;
    
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