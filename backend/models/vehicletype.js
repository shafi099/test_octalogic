'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VehicleType.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'VehicleType',
  });

  VehicleType.associate = function(models) {
    VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId' });
  };
  
  return VehicleType;
};