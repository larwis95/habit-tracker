/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
import { getUserHabits, getWeek, getDayName, formatDate } from './api.js';

const renderHabits = async (habits) => {
  for (let i = 0; i < habits.length; i += 1) {
    const habit = habits[i];
    const day = await getDayName(habit.scheduled_date);
    const container = document.querySelector(`.${day}`);
    const habitContainer = document.createElement('div');
    habitContainer.setAttribute('data-habit-id', habit.id);
    habitContainer.setAttribute('data-habit-date', habit.scheduled_date);
    habitContainer.classList.add('habit');
    const nameEl = document.createElement('h3');
    nameEl.textContent = habit.habit_name;
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = habit.habit_description;
    habitContainer.appendChild(nameEl);
    habitContainer.appendChild(descriptionEl);
    container.appendChild(habitContainer);
  };
};

const renderWeekContainer = (habits, week) => {
  const weekContainer = document.querySelector('.weeks');
  for (let i = 0; i < week.length; i += 1) {
    const date = week[i];
    const dayContainer = document.createElement('div');
    dayContainer.classList.add(`${date.name}`);
    dayContainer.classList.add('day');
    dayContainer.classList.add('col-4')
    const dayHeader = document.createElement('h2');
    dayHeader.textContent = date.name;
    dayContainer.appendChild(dayHeader);
    weekContainer.appendChild(dayContainer);
  }
};


const handleDomLoad = async () => {
  const week = await getWeek();
  const habits = await getUserHabits();
  const formattedWeek = [];
  for (let i = 0; i < week.length; i += 1) {
    const day = week[i];
    const dayName = await getDayName(day);
    const formattedDay = await formatDate(day, 'MM/dd/yyyy');
    formattedWeek.push({ day: formattedDay, name: dayName });
  }
  renderWeekContainer(habits, formattedWeek);
  renderHabits(habits);
};

document.addEventListener('DOMContentLoaded', handleDomLoad);

