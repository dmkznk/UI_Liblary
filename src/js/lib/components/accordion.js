import $ from '../core';

$.prototype.accordion = function (
  headActive = 'accordion-head--active',
  contentActive = 'accordion-content--active',
  paddings = 40
) {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => {
      $(this[i]).toggleClass(headActive);
      $(this[i].nextElementSibling).toggleClass(contentActive);

      if (this[i].classList.contains(headActive)) {
        this[i].nextElementSibling.style.height =
          this[i].nextElementSibling.scrollHeight + paddings + 'px';
      } else {
        this[i].nextElementSibling.style.height = '0px';
      }
    });
  }
};

$('.accordion-head').accordion();
