/* eslint-disable no-param-reassign */
const petContainter = document.querySelector('.homePagePets');

let lastScroll = 0;

const scrollEndHandler = () => {
  lastScroll = window.scrollY;
  if (lastScroll > 400) {
  petContainter.style.setProperty('--right', `0%`);
  }
  else {
    petContainter.style.setProperty('--right', `100%`);
  }
};

const handleDOMContentLoaded = async () => {
  petContainter.style.setProperty('--right', `100%`);
}

document.addEventListener('scrollend', scrollEndHandler);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
