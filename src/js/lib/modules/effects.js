import $ from '../core';

$.prototype.animationOverTime = function (duration, callback, finito) {
  let timeStart;

  function _animationOverTime(time) {
    if (!timeStart) {
      timeStart = time;
    }

    let timeElapsed = time - timeStart;
    let complection = Math.min(timeElapsed / duration, 1);

    callback(complection);

    if (timeElapsed < duration) {
      requestAnimationFrame(_animationOverTime);
    } else {
      if (typeof finito === 'function') {
        finito();
      }
    }
  }

  return _animationOverTime;
};

$.prototype.fadeIn = function (duration, display = 'block', finito) {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = display;

    const _fadeIn = complection => {
      this[i].style.opacity = complection;
    };

    const ani = this.animationOverTime(duration, _fadeIn, finito);
    requestAnimationFrame(ani);
  }

  return this;
};

$.prototype.fadeOut = function (duration, finito) {
  for (let i = 0; i < this.length; i++) {
    const _fadeOut = complection => {
      this[i].style.opacity = 1 - complection;
      if (complection === 1) {
        this[i].style.display = 'none';
      }
    };

    const ani = this.animationOverTime(duration, _fadeOut, finito);
    requestAnimationFrame(ani);
  }

  return this;
};

$.prototype.fadeToggle = function (duration, display = 'block', finito) {
  for (let i = 0; i < this.length; i++) {
    if (window.getComputedStyle(this[i]).display === 'none') {
      this[i].style.display = display;
      const _fadeIn = complection => {
        this[i].style.opacity = complection;
      };

      const ani = this.animationOverTime(duration, _fadeIn, finito);
      requestAnimationFrame(ani);
    } else {
      const _fadeOut = complection => {
        this[i].style.opacity = 1 - complection;
        if (complection === 1) {
          this[i].style.display = 'none';
        }
      };

      const ani = this.animationOverTime(duration, _fadeOut, finito);
      requestAnimationFrame(ani);
    }
  }

  return this;
};
