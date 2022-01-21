function activateSlider() {
  new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.btn-next',
      prevEl: '.btn-prev',
    },
    spaceBetween: 20,
    loop: true,
    slidesPerView: 4,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.41,
        spaceBetween: 16,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1.7,
        spaceBetween: 16,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 2.62,
        spaceBetween: 20,
      },
      // when window width is >= 820px
      820: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 1020px
      1020: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
}

activateSlider();
