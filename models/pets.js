const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Pet extends Model {}

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pet_health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pet_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'state',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet'
  }
);

module.exports = Pet;
