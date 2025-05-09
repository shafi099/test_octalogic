'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    vehicleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  
  Booking.associate = function(models) {
    Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };

  return Booking;
};