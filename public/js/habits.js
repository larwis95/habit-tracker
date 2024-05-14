/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
import { getUserHabits, getWeek, getDayName, formatDate } from './api.js';

// const renderHabits = (data) => {
//   const weekContainer = document.querySelector('.weeks');
//   const weekDays = weekContainer.children;
// };

const renderWeekContainer = (data) => {
  const weekContainer = document.querySelector('.weeks');
  for (let i = 0; i < data.length; i += 1) {
    const date = data[i];
    const dayContainer = document.createElement('div');
    dayContainer.classList.add(`${date.name}`);
    dayContainer.classList.add('day');
    dayContainer.classList.add('col-3')
    const dayHeader = document.createElement('h2');
    dayHeader.textContent = date.name;
    dayContainer.appendChild(dayHeader);
    weekContainer.appendChild(dayContainer);
  }
};

const formatData = async (week, habits) => {
  const formattedWeek = [];
  for (let i = 0; i < week.length; i += 1) {
    const day = week[i];
    const dayName = await getDayName(day);
    const formattedDay = await formatDate(day, 'MM/dd/yyyy');
    formattedWeek.push({ day: formattedDay, name: dayName, habits: [] });
  }
  for (let i = 0; i < habits.length; i += i) {
    const habit = habits[i]
    const day = formattedWeek[i];
    if (habit.scheduled_date === day.day) {
      day.habits.push(habit);
    }
  };
  return formattedWeek;
};





const handleDomLoad = async () => {
  const week = await getWeek();
  const habits = await getUserHabits();
  const data = await formatData(week, habits)
  renderWeekContainer(data);

};

document.addEventListener('DOMContentLoaded', handleDomLoad);

