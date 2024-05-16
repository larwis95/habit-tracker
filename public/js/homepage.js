/* eslint-disable no-param-reassign */
const petContainter = document.querySelector('.homePagePets');
const pets = document.querySelectorAll('.petImage');
let lastScroll = 0;
let right = 0;

const scrollHandler = () => {
  if (window.scrollY < lastScroll) {
    if (right > 100) {
      right = 100;
    }
   petContainter.style.setProperty('--right', `${right += 10}%`);
   pets.forEach(pet => {
    pet.style.objectPosition = `${right + 40 + 100}% 50%`;
  });
  }
  else {
    if (right < 0) {
      right = 0;
    }
    petContainter.style.setProperty('--right', `${right -= 10}%`);
    pets.forEach(pet => {
      pet.style.objectPosition = `${right - 40 + 100}% 50%`;
    });
  }
};

const scrollEndHandler = () => {
  lastScroll = window.scrollY;
  petContainter.style.setProperty('--right', `0%`);
};

const handleDOMContentLoaded = async () => {
  petContainter.style.setProperty('--right', `100%`);
}

document.addEventListener('scroll', scrollHandler);
document.addEventListener('scrollend', scrollEndHandler);
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
