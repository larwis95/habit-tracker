const petContainter = document.querySelector('.homePagePets');
let lastScroll = 0;
const right = 0;

const scrollHandler = () => {
  if (window.scrollY < lastScroll) {
   petContainter.style.setProperty('--right', `${right + 40}%`);
  }
  else {
    petContainter.style.setProperty('--right', `${right - 40}%`);
  }
};

const scrollEndHandler = () => {
  lastScroll = window.scrollY;
};

document.addEventListener('scroll', scrollHandler);
document.addEventListener('scrollend', scrollEndHandler);
