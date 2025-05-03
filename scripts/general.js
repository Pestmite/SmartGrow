function generateHeader() {
  document.querySelectorAll('.header').forEach((header) => {
    header.innerHTML = `<div class="menu-header">
     <div class="middle">
      <a href="index.html" class="nav-link">Overview</a>
      <a href="simulation.html" class="nav-link">Simulation</a>
      <a href="customize.html" class="nav-link">Customize</a>
      <a href="about.html" class="nav-link">About</a>
    </div>
      <div class="off-screen-menu">
        <div class="left-menu">
          <a href="index.html" class="menu-element">Overview</a>
          <a href="simulation.html" class="menu-element">Simulation</a>
          <a href="customize.html" class="menu-element">Customize</a>
          <a href="about.html" class="menu-element">About</a>
        </div>
        <div class="right-menu">
          <a class="menu-element first-right-menu" href="login.html">Sign in</a>
          <a class="menu-element buy-button-menu" href="login.html">Buy</a>
        </div>
      </div>
      
      <div class="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <nav class="right"> 
      <div>
        <a class="nav-link" href="login.html">Sign in</a>
      </div>
      <div>
        <a class="nav-link buy-button" href="">Buy</a>
      </div>
    </nav>`
  })
}

export function selectPage(page) {
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.innerHTML === page) {
      link.classList.add('selected-page')
    }
  });

  document.querySelectorAll('.menu-element').forEach((link) => {
    if (link.innerHTML === page) {
      link.classList.add('selected-page-menu')
    }
  });
}

generateHeader();

document.querySelector('.menu').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('active');
  document.querySelector('.off-screen-menu').classList.toggle('active');
  document.querySelector('body').classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const clickInsideMenu = document.querySelector('.off-screen-menu').contains(event.target);
  const clickMenuButton = document.querySelector('.menu').contains(event.target);

  if (!clickInsideMenu && !clickMenuButton) {
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.off-screen-menu').classList.remove('active');
    document.body.classList.remove('active');
  }
});
