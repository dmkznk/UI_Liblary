import $ from '../core';
import calcScroll from '../components/helpers/calcScroll';

$.prototype.modal = function (created) {
  const scroll = calcScroll();

  for (let i = 0; i < this.length; i++) {
    const target = this[i].getAttribute('data-target');

    $(this[i]).click(e => {
      e.preventDefault();
      $(target).fadeIn(500);
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
    });

    const closeElements = document.querySelectorAll(`${target} [data-close]`);
    closeElements.forEach(elem => {
      $(elem).click(() => {
        $(target).fadeOut(500);
        smoothClose();
      });
    });

    $(target).click(e => {
      if (e.target.classList.contains('modal')) {
        $(target).fadeOut(500);
        smoothClose();
      }
    });

    const smoothClose = () => {
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.marginRight = '';

        if (created) document.querySelector(target).remove();
      }, 500);
    };
  }
};

$('[data-toggle="modal"]').modal();

$.prototype.createModal = function ({ text, btns } = {}) {
  for (let i = 0; i < this.length; i++) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', this[i].getAttribute('data-target').slice(1));

    // btns = { count: num, settings: [[text, ((classNames = []), close, cb)]]};

    const buttons = [];
    for (let j = 0; j < btns.count; j++) {
      let btn = document.createElement('button');
      btn.classList.add('btn', ...btns.settings[j][1]);
      btn.textContent = btns.settings[j][0];
      if (btns.settings[j][2]) {
        btn.setAttribute('data-close', 'true');
      }
      if (btns.settings[j][3] && typeof btns.settings[j][3] === 'function') {
        btn.addEventListener('click', btns.settings[j][3]);
      }

      buttons.push(btn);
    }

    modal.innerHTML = `
             <div class="modal-dialog">
                <div class="modal-content">
                    <button class="close" data-close>
                        <span>&times;</span>
                    </button>
                    <div class="modal-header">
                        <div class="modal-title">
                            ${text.title}
                        </div>
                    </div>
                    <div class="modal-body">
                        ${text.body}
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
    `;

    modal.querySelector('.modal-footer').append(...buttons);
    document.body.append(modal);

    $(this[i]).modal(true);
    $(this[i].getAttribute('data-target')).fadeIn(500);
  }
};
