const getUserHabits = async () => {
  const response = await fetch('/api/habits/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to get habits');
};

const getWeek = async () => {
  const response = await fetch('/api/dates/week', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to get week');
};

const getDayName = async (date) => {
  const response = await fetch('/api/dates/dayname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to get day name');
};

const formatDate = async (date, format) => {
  const response = await fetch('/api/dates/format', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, format }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to format date');
};

export { getUserHabits, getWeek, getDayName, formatDate }
