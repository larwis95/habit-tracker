import { getUserHabits, getWeek, getDayName, formatDate } from './api.js';

const addHabit = document.querySelector('#habitSubmitBtn');
const day = document.getElementById('day-select');

console.log(day.value);

const mapDay = async () => {
  const week = await getWeek();
  for (let i = 0; i < week.length; i++) {
    const day = await getDayName(week[i]);
    week[i] = {
      date: await formatDate(week[i], 'MM/dd/yyyy'),
      name: day,
    }
  }
  return week;

}

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
      document.location.replace('/dashboard')
    }
  }

}


const main = async () => {
  const week = await mapDay();
  console.log(week);
};

main();
addHabit.addEventListener('click', habitSubmit);























