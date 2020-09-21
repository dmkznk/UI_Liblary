const calcScroll = () => {
  let div = document.createElement('div');

  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollwidth = div.offsetWidth - div.clientWidth;
  div.remove();

  return scrollwidth;
};

export default calcScroll;
