'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bookings', 'user');
    await queryInterface.addColumn('Bookings', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Bookings', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'user', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.removeColumn('Bookings', 'firstName');
    await queryInterface.removeColumn('Bookings', 'lastName');
  }
};
