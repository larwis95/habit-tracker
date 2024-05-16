/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
import { getUserHabits, getWeek, getDayName, formatDate, isDateBefore, isSameWeek, mapPetStates, differenceInDays } from './api.js';

const petModal = document.querySelector('.modal');


let oldPetState;

const deleteOldHabits = async (habits) => {
  const today = await formatDate(new Date(), 'MM/dd/yyyy');
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    const habitDate = habit.scheduled_date;
    const formattedHabitDate = await formatDate(habitDate, 'MM/dd/yyyy');
    if ((await isDateBefore(formattedHabitDate, today) && await differenceInDays(today, formattedHabitDate) > 7)) {
      await fetch(`/api/habits/${habit.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
};

const closeModal = (event) => {
  event.stopPropagation();
  const body = document.querySelector('body');
  const modalClose = document.querySelector('.close');
  const modalBtn = document.querySelector('.modalBtn');
  if (event.target === modalClose || event.target === modalBtn) {
    petModal.style.display = 'none';
    body.classList.remove('modal-open');
  }
};

const updatePetModal = async () => {
  const petImg = document.querySelector('.petImg');
  const petDiv = document.querySelector('.modalPetDiv');
  const response = await fetch('/api/pets/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const pet = await response.json();
    const petState = pet[0].state;
    const petName = document.querySelector('.modal-title');
    petDiv.style.transform = 'rotate(3turn)'
    petDiv.style.transition = 'transform 2s';
    petName.textContent = `${pet[0].pet_name} leveled up!`;
    setTimeout(() => {
      petImg.setAttribute('src', petState.state_image);
    }, 1600);
  }
};

const handleAddExperience = async () => {
  let petExperience = 0;
  let stateMap;
  const response = await fetch('/api/pets/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const pet = await response.json();
    petExperience = pet[0].pet_health + 1;
    const type = pet[0].pet_type
    stateMap = await mapPetStates(type);
    await fetch('/api/pets', {
      method: 'PUT',
      body: JSON.stringify({ pet_health: petExperience }),
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (stateMap.has(petExperience)) {
    const petState = stateMap.get(petExperience);
    await fetch('/api/pets', {
      method: 'PUT',
      body: JSON.stringify({ pet_state: petState }),
      headers: { 'Content-Type': 'application/json' },
    });
    const body = document.querySelector('body');
    body.classList.add('modal-open');
    petModal.style.display = 'block';
    updatePetModal();
  }
};

const handleHabitClick = async (event) => {
  const closestHabit = event.target.closest('.habit');
  if (closestHabit.classList.contains('completed') || closestHabit.classList.contains('failed')) return
    const habitId = closestHabit.getAttribute('data-habit-id');
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'PUT',
      body: JSON.stringify({ completed_date: new Date()}),
      headers: { 'Content-Type': 'application/json' },
    });
  if (response.ok) {
    closestHabit.classList.add('completed');
    handleAddExperience();
  }
};

const handleHabitStatus = async () => {
  const habits = document.querySelectorAll('.habit');
  habits.forEach((habit) => { habit.addEventListener('click', handleHabitClick) });
  const today = await formatDate(new Date(), 'MM/dd/yyyy');
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    const habitDate = habit.getAttribute('data-habit-date');
    const formattedHabitDate = await formatDate(habitDate, 'MM/dd/yyyy');
    if (!await isDateBefore(today, formattedHabitDate) && (today !== formattedHabitDate)) {
      habit.classList.add('failed');
    }
  }
};

const renderHabits = async (habits) => {
  const today = await formatDate(new Date(), 'MM/dd/yyyy');
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    const day = await getDayName(habit.scheduled_date);
    if (await isSameWeek(today, habit.scheduled_date)) {
      const container = document.querySelector(`.${day}`);
      const habitContainer = document.createElement('div');
      habitContainer.setAttribute('data-habit-id', habit.id);
      habitContainer.setAttribute('data-habit-date', habit.scheduled_date);
      habitContainer.classList.add('habit');
      if (habit.completed_date) habitContainer.classList.add('completed');
      const nameEl = document.createElement('h3');
      nameEl.classList.add('text-start');
      nameEl.textContent = habit.habit_name;
      const descriptionEl = document.createElement('p');
      descriptionEl.classList.add('text-center');
      descriptionEl.textContent = habit.habit_description;
      habitContainer.appendChild(nameEl);
      habitContainer.appendChild(descriptionEl);
      container.appendChild(habitContainer);
    };
  };
  handleHabitStatus();
};

const renderWeekContainer = async (week) => {
  const today = await formatDate(new Date(), 'MM/dd/yyyy');
  const weekContainer = document.querySelector('.weeks');
  for (let i = 0; i < week.length; i += 1) {
    const date = week[i];
    const dayContainer = document.createElement('div');
    dayContainer.classList.add(`${date.name}`);
    dayContainer.classList.add('day');
    if (today === date.day) dayContainer.classList.add('today');
    dayContainer.classList.add('col');
    const dayHeader = document.createElement('h2');
    dayHeader.textContent = date.name;
    dayContainer.appendChild(dayHeader);
    weekContainer.appendChild(dayContainer);
  }
};

const handleNoHabits = (habits, pet) => {
  const weekContainer = document.querySelector('.weeks');
  if (habits.length  < 1) {
    const noHabitsDiv = document.createElement('div');
    const habitsLink = document.createElement('a');
    habitsLink.setAttribute('href', '/dashboard');
    habitsLink.setAttribute('id', 'homePageLink');
    noHabitsDiv.classList.add('noHabits');
    weekContainer.appendChild(noHabitsDiv);
    const noHabits = document.createElement('h2');
    noHabits.textContent = 'No habits scheduled, create a habit first!';
    habitsLink.appendChild(noHabits);
    noHabitsDiv.appendChild(habitsLink);

  }
  if (!pet[0]) {
    const noPetDiv = document.createElement('div');
    const petLink = document.createElement('a');
    petLink.setAttribute('href', '/dashboard');
    petLink.setAttribute('id', 'homePageLink');
    noPetDiv.classList.add('noPet');
    weekContainer.appendChild(noPetDiv);
    const noPet = document.createElement('h2');
    noPet.textContent = 'No Pet, create a pet first!';
    petLink.appendChild(noPet);
    noPetDiv.appendChild(petLink);
  }

};

const handleDomLoad = async () => {
  const week = await getWeek();
  const habits = await getUserHabits();
  const response = await fetch('/api/pets/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const pet = await response.json();
  const formattedWeek = [];
  if (habits.length < 1 || !pet[0]) {
    handleNoHabits(habits, pet);
    return;
  }
  for (let i = 0; i < week.length; i += 1) {
    const day = week[i];
    const dayName = await getDayName(day);
    const formattedDay = await formatDate(day, 'MM/dd/yyyy');
    formattedWeek.push({ day: formattedDay, name: dayName });
  }
  deleteOldHabits(habits);
  renderWeekContainer(formattedWeek);
  renderHabits(habits);
};

const setPetModal = async () => {
  const response = await fetch('/api/pets/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const pet = await response.json();
    const petImg = document.querySelector('.petImg');
    const petName = document.querySelector('.modal-title');
    if (!pet[0]) return;
    petName.textContent = pet[0].pet_name;
    oldPetState = pet[0].state.state_image;
    petImg.setAttribute('src', oldPetState);
  }
};


document.addEventListener('DOMContentLoaded', handleDomLoad);
document.addEventListener('DOMContentLoaded', setPetModal);
petModal.addEventListener('click', closeModal);

