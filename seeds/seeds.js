const sequelize = require('../config/config');
const { User, Habit, Pet, State } = require('../models');

const userData = require('./userData.json');
const habitData = require('./habitData.json');
const petData = require('./petData.json');
const stateData = require('./stateData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await State.bulkCreate(stateData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Habit.bulkCreate(habitData);

  await Pet.bulkCreate(petData);

  process.exit(0);
};

seedDatabase();
