import $ from '../core';

$.prototype.addAttribute = function (name, value = true) {
  if (!name) {
    return this;
  }

  for (let i = 0; i < this.length; i++) {
    this[i].setAttribute(name, value);
  }

  return this;
};

$.prototype.deleteAttribute = function (name) {
  for (let i = 0; i < this.length; i++) {
    this[i].removeAttribute(name);
  }

  return this;
};

$.prototype.toggleAttribute = function (name) {
  for (let i = 0; i < this.length; i++) {
    this[i].toggleAttribute(name);
  }

  return this;
};
