/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
import { getWeek, getDayName, formatDate, isDateBefore } from './api.js';

const addHabit = document.querySelector('#habitSubmitBtn');
const day = document.getElementById('day-select');
const deleteBtn = document.querySelectorAll('#delete-button');
const addPet = document.getElementById('addPet-button');

const mapDay = async () => {
  const week = await getWeek();
  for (let i = 0; i < week.length; i += 1) {
    const day = await getDayName(week[i]);
    week[i] = {
      date: await formatDate(week[i], 'MM/dd/yyyy'),
      name: day,
    }
  }
  return week;
};

const habitSubmit = async (event) => {
  event.preventDefault();
  const habit_name = document.querySelector('#habitNameInput').value;
  const habit_description = document.querySelector('#habitDesInput').value;
  const daySelected = day.value;

  const week = await mapDay();
  const date = week[daySelected];
  const scheduled_date = date.date;


  if (habit_name && habit_description && scheduled_date) {
    const response = await fetch('/api/habits/', {
      method: 'POST',
      body: JSON.stringify({
        habit_name,
        habit_description,
        scheduled_date
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    }
  }

}

const handleDelete = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-habit-id');
  await fetch(`/api/habits/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const habitContainer = event.target.closest('.habitContainer');
  habitContainer.remove();
};


const handleAddPet = async (event) => {
  event.preventDefault();
  const pet_name = document.querySelector('#petNameInput').value;
  if (pet_name) {
    const response = await fetch('/api/pets/',
      {
        method: 'POST',
        body: JSON.stringify({
          pet_name,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      }
    }
};

const handleDOMContentLoaded = async () => {
  const weekMap = await mapDay();
  const today = await formatDate(new Date(), 'MM/dd/yyyy');
  for (let i = 0; i < weekMap.length; i += 1) {
    if(await isDateBefore(today, weekMap[i].date) || weekMap[i].date === today) {
      const option = document.createElement('option');
      option.setAttribute('value', i);
      option.textContent = weekMap[i].name;
      day.appendChild(option);
    }
  }
};

addHabit.addEventListener('click', habitSubmit);
deleteBtn?.forEach((button) => button.addEventListener('click', handleDelete));
addPet?.addEventListener('click', handleAddPet);

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
