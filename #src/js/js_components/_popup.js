function openPopup() {
  const btnOpen = document.querySelector('.banner__btn');
  const popup = document.querySelector('.popup-contacts');
  const bodyPopup = document.querySelector('.popup-contacts ');
  const bodyPage = document.querySelector('body');
  const inpName = document.querySelector('#contact-name');

  btnOpen.addEventListener('click', () => {
    popup.classList.add('active');
    bodyPage.style.overflow = 'hidden';
    inpName.focus();
  });

  bodyPopup.addEventListener('click', (e) => {
    const target = e.target;
    if (
      target.classList.contains('popup-btn-close') ||
      target.classList.contains('popup-contacts__body')
    ) {
      popup.classList.remove('active');
      bodyPage.style.overflow = '';
      btnOpen.focus();
    }
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && popup.classList.contains('active')) {
      popup.classList.remove('active');
      bodyPage.style.overflow = '';
      btnOpen.focus();
    }
  });
}

openPopup();
