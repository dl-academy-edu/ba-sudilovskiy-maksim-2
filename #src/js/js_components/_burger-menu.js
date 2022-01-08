function burgerMenu() {
  const btnOpen = document.querySelector('.burger-btns__open');
  const btnClose = document.querySelector('.burger-btns__close');
  const bodyMenu = document.querySelector('.burger');
  const bodyPage = document.querySelector('body');

  btnOpen.addEventListener('click', (e) => {
    btnOpen.classList.add('active');
    btnClose.classList.add('active');
    bodyMenu.classList.add('active');
    bodyPage.style.overflow = 'hidden';
  });
  btnClose.addEventListener('click', (e) => {
    btnOpen.classList.remove('active');
    btnClose.classList.remove('active');
    bodyMenu.classList.remove('active');
    bodyPage.style.overflow = '';
  });
}

burgerMenu();
