'use strict';

var rangeSlider = document.getElementById('range');

noUiSlider.create(rangeSlider, {
  start: 500,
  connect: [true, false],
  range: {
    min: 0,
    max: 3000,
  },
  step: 1,
});

function changeRangeSlider() {
  const valueRangeMax = document.querySelector('.range__inp__max');
  
  rangeSlider.noUiSlider.on('update', function (value)  {
    valueRangeMax.innerHTML = Math.round(value);
  })
}

changeRangeSlider();