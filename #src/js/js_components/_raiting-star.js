function raitingActive() {
  const raitingBody = document.querySelector('.raiting__list');
  const raitingTxt = document.querySelector('.raiting__txt');

  raitingBody.addEventListener('click', (e) => {
    if (e.target.dataset.itemValue) {
      let numStars = e.target.dataset.itemValue;
      raitingBody.dataset.totalValue = numStars;
      raitingTxt.style.color = '#C29974';
    }
  });
}

raitingActive();