const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class State extends Model {}

State.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    state_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'state'
  }
);

module.exports = State;
