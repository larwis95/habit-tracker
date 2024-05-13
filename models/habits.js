const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Habit extends Model {}

Habit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    habit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    habit_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    scheduled_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    completed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'habit',

  }
);

module.exports = Habit;
