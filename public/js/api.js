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

const isDateBefore = async (date1, date2) => {
  const response = await fetch('/api/dates/compare', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date1, date2 }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to compare dates');
};

const isSameWeek = async (today, date) => {
  const response = await fetch('/api/dates/week/sameweek', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date1: today, date2: date }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to compare dates');
}

const differenceInDays = async (date1, date2) => {
  const response = await fetch('/api/dates/daydifference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date1, date2 }),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to get day difference');
};

const getPetTypes = async () => {
  const response = await fetch('/api/states', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to get pet types');
};

const sortTypes = (types) => {
  const orange = [];
  const green = [];
  for (let i = 0; i < types.length; i += 1) {
    const type = types[i];
    if (type.type_name === 'orange') {
      orange.push(type);
    } else {
      green.push(type);
    }
  }
  orange.shift();
  green.shift();
  return { orange, green };
}

const mapPetStates = async (type) => {
  const stateMap = new Map();
  const types = await getPetTypes();
  const { orange, green } = sortTypes(types);
  let exp = 5
  if (type === 'orange') {
    for (let i = 0; i < orange.length; i += 1) {
      const state = orange[i];
      stateMap.set(exp, state.id);
      exp += 5;
    }
  }
  if (type === 'green') {
    for (let i = 0; i < green.length; i += 1) {
      const state = green[i];
      stateMap.set(exp, state.id);
      exp += 5;
    }
  }
  return stateMap;
};

export { getUserHabits, getWeek, getDayName, formatDate, isDateBefore, isSameWeek, mapPetStates, differenceInDays }
