function audioStart() {
  const btnOn = document.querySelector('.audio-btn__icon_on'),
        btnOff = document.querySelector('.audio-btn__icon_off'),
        audio = document.querySelector('.audio');

  document.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    if (target.classList.contains('audio-btn__icon_off')) {
      btnOff.classList.remove('active');
      btnOn.classList.add('active');
      audio.play();
      audio.volume = 0.6;
    } else {
      btnOff.classList.add('active');
      btnOn.classList.remove('active');
      audio.pause();
    }
  });
}

audioStart();
