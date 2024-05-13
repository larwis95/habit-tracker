const User = require('./users');
const Habit = require('./habits');
const Pet = require('./pets');
const State = require('./state');

User.hasMany(Habit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pet.belongsTo(User, {
  foreignKey: 'user_id'
});

State.hasMany(Pet, {
  foreignKey: 'pet_state',
  onDelete: 'CASCADE'
});

Pet.belongsTo(State, {
  foreignKey: 'pet_state'
});

Habit.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Habit, Pet, State }
