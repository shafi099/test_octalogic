'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', category: 'car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', category: 'car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', category: 'car', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', category: 'bike', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};