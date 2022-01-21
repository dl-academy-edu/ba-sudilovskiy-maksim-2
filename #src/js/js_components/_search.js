function searchActive() {
  const searchBtn = document.querySelector('.search__btn');
  const searchInp = document.querySelector('.search__inp');
  const searchBody = document.querySelector('.header__search');
  searchBtn.addEventListener('click', (e) => {
    searchInp.classList.toggle('active');
    searchBody.classList.toggle('active');
  });
}

searchActive();