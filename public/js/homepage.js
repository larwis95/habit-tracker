/* eslint-disable no-param-reassign */
const petContainter = document.querySelector('.homePagePets');
const pets = document.querySelectorAll('.petImage');
let lastScroll = 0;
const right = 0;

const scrollHandler = () => {
  if (window.scrollY < lastScroll) {
   petContainter.style.setProperty('--right', `${right + 40}%`);
   pets.forEach(pet => {
    pet.style.objectPosition = `${right + 40 + 100}% 50%`;
  });
  }
  else {
    petContainter.style.setProperty('--right', `${right - 40}%`);
    pets.forEach(pet => {
      pet.style.objectPosition = `${right - 40 + 100}% 50%`;
    });
  }
};

const scrollEndHandler = () => {
  lastScroll = window.scrollY;
};

document.addEventListener('scroll', scrollHandler);
document.addEventListener('scrollend', scrollEndHandler);
