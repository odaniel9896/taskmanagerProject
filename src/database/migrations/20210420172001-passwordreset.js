'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'passwordToken', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'passwordToken')
  }
};
