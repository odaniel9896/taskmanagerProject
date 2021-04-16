'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'isValid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }),
    queryInterface.addColumn('users', 'confirmationCode', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'isValid'),
    queryInterface.removeColumn('users', 'confirmationCode')
  }
};
