function activateSlider() {
  new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
    spaceBetween: 20,
    loop: true,
    slidesPerView: 4,
  });
}

activateSlider();
